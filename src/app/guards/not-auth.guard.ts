import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class NotAuthGuard implements CanActivate, CanLoad {
    constructor(
        private router: Router,
        private authService: AuthService
    ) {
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UrlTree | boolean> {
        return this.authService.getAuthenticated()
            .pipe(
                take(1),
                map((authenticated: boolean) => authenticated ? this.router.parseUrl('/') : true));
    }

    canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> {
        return this.authService.getAuthenticated()
            .pipe(
                take(1),
                map((authenticated: boolean) => {
                    if (!authenticated) {
                        const token = AuthService.getSavedToken();

                        if (token) {
                            this.authService.setAuthenticated(true);
                            this.router.navigate(['/']);

                            return false;
                        } else {

                            return true;
                        }
                    } else {
                        return false;
                    }
                })
            );
    }
}
