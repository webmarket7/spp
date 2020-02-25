import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Credentials } from '../auth/models/credentials.model';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { AuthData } from '../auth/models/auth-data.model';
import { User } from '../store/user/user.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    static prepareAuthorizationHeader({username, password}: Credentials): string {
        return `Authorization: Basic ${btoa(`${username}:${password}`)}`;
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

    constructor(
        private router: Router,
        private apiService: ApiService
    ) {
    }

    signIn(credentials: Credentials): Observable<AuthData> {
        return this.apiService.getRequest('users/login', null, AuthService.prepareAuthorizationHeader(credentials));
    }

    signUp(credentials: Credentials): Observable<{ message: string, user: User }> {
        return this.apiService.postRequest('users/signup', credentials);
    }

    getCurrentUser(): Observable<User> {
        return this.apiService.getRequest('users/current');
    }

    redirect(redirectTo: string) {
        this.router.navigateByUrl(redirectTo || '/app');
    }
}
