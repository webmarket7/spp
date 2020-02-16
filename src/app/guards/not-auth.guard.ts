import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class NotAuthGuard implements CanActivate, CanLoad {
    constructor(
        private router: Router,
        private authService: AuthService
    ) {
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): UrlTree | boolean {
        return this.authService.authenticated ? this.router.parseUrl('/') : true;
    }

    canLoad(
        route: Route,
        segments: UrlSegment[]
    ): boolean {
        const authenticated = this.authService.authenticated;

        if (!authenticated) {
            const token = AuthService.getSavedToken();

            if (token) {
                this.authService.authenticate(token);
                this.router.navigate(['/']);

                return false;
            } else {

                return true;
            }
        } else {
            return false;
        }
    }
}
