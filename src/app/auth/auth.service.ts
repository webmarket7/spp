import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Credentials } from './models/credentials.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    authenticated: boolean;
    token: string;

    constructor(
        private router: Router,
    ) {
    }

    static saveToken(token: string): void {
        localStorage.setItem('token', token);
    }

    static deleteToken(): void {
        localStorage.removeItem('token');
    }

    static getSavedToken(): string {
        try {
            return localStorage.getItem('token') || null;
        } catch (err) {
            return null;
        }
    }

    redirect(redirectTo: string) {
        this.router.navigateByUrl(redirectTo || '/app');
    }

    authenticate(token: string) {
        this.authenticated = true;
        this.token = token;
    }

    signIn({username, password}: Credentials, redirectTo?: string): void {
        const token = btoa(`${username}:${password}`);

        AuthService.saveToken(token);
        this.authenticate(token);
        this.redirect(redirectTo);
    }

    signUp(credentials: Credentials): void {
        this.signIn(credentials);
    }
}

