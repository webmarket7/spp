import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { State } from '../store';
import { selectAuthenticated } from '../store/auth/auth.selectors';

@Injectable({
    providedIn: 'root'
})
export class NotAuthGuard implements CanActivate, CanLoad {

    constructor(
        private store: Store<State>,
        private router: Router
    ) {
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> {
        return this.store.pipe(
            select(selectAuthenticated),
            take(1),
            map((authenticated) => {
                if (authenticated) {
                    this.router.navigate(['/']);
                }

                return !authenticated;
            })
        );
    }

    canLoad(
        route: Route,
        segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
        return this.store.pipe(
            select(selectAuthenticated),
            take(1),
            map((authenticated) => {
                if (authenticated) {
                    this.router.navigate(['/']);
                }

                return !authenticated;
            })
        );
    }
}
