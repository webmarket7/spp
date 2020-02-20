import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { mapTo, switchMap, take } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

    constructor(
        private router: Router,
        private authService: AuthService
    ) {
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
        return this.authService.getAuthenticated().pipe(
            take(1),
            switchMap((authenticated: boolean) => {
                if (!authenticated) {
                    const token = AuthService.getSavedToken();

                    if (token) {
                        this.authService.setAuthenticationState(token);

                        return this.authService.loadCurrentUser().pipe(mapTo(true));
                    } else {
                        return of(this.router.createUrlTree(['/auth/sign-in'], {
                            queryParams: {
                                redirectTo: state.url
                            }
                        }));
                    }
                }

                return of(authenticated);
            })
        );
    }

    canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> {
        return this.authService.getAuthenticated().pipe(
            take(1),
            switchMap((authenticated: boolean) => {
                if (!authenticated) {
                    const token = AuthService.getSavedToken();

                    if (token) {
                        this.authService.setAuthenticationState(token);

                        return this.authService.loadCurrentUser().pipe(mapTo(true));
                    } else {
                        this.router.navigate(['/auth/sign-in'], {
                            queryParams: {
                                redirectTo: this.router.createUrlTree(['/', ...segments.map((segment) => segment.path)]).toString()
                            }
                        });

                        return of(false);
                    }
                }

                return of(authenticated);
            })
        );
    }
}
