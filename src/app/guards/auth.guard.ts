import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { State } from '../store';
import { selectAuthenticated } from '../store/auth/auth.selectors';
import { loadCurrentUser, signInSuccess } from '../store/auth/auth.actions';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {


    constructor(
        private router: Router,
        private store: Store<State>
    ) {
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {

        return this.store.pipe(
            select(selectAuthenticated),
            take(1),
            map((authenticated: boolean) => {
                if (!authenticated) {
                    const token = AuthService.getSavedToken();

                    if (token) {
                        this.store.dispatch(signInSuccess({authData: {token}}));
                        this.store.dispatch(loadCurrentUser());

                        return true;
                    } else {
                        return this.router.createUrlTree(['/auth/sign-in'], {
                            queryParams: {
                                redirectTo: state.url
                            }
                        });
                    }
                }

                return authenticated;
            })
        );
    }

    canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> {
        return this.store.pipe(
            select(selectAuthenticated),
            take(1),
            map((authenticated: boolean) => {
                if (!authenticated) {
                    const token = AuthService.getSavedToken();

                    if (token) {
                        this.store.dispatch(signInSuccess({authData: {token}}));
                        this.store.dispatch(loadCurrentUser());

                        return true;
                    } else {
                        this.router.navigate(['/auth/sign-in'], {
                            queryParams: {
                                redirectTo: this.router.createUrlTree(['/', ...segments.map((segment) => segment.path)]).toString()
                            }
                        });

                        return false;
                    }
                }

                return authenticated;
            }));
    }
}
