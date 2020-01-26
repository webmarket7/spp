import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Credentials } from './models/credentials.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

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

    signIn(credentials: Credentials): void {
        console.log({credentials});
    }

    signUp(credentials: Credentials): void {
        console.log({credentials});
    }

    redirect(redirectTo: string) {
        this.router.navigateByUrl(redirectTo || '/app');
    }
}

