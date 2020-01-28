import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

    constructor(
        private router: Router,
        private authService: AuthService
    ) {
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
        const authenticated = this.authService.authenticated;

        if (!authenticated) {
            const token = AuthService.getSavedToken();

            if (token) {
                this.authService.authenticate(token);

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
    }

    canLoad(route: Route, segments: UrlSegment[]): boolean {
        const authenticated = this.authService.authenticated;

        if (!authenticated) {
            const token = AuthService.getSavedToken();

            if (token) {
                this.authService.authenticate(token);

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
    }
}
