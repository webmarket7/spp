import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Credentials } from './models/credentials.model';
import { HttpHeaders } from '@angular/common/http';
import { ApiService } from '../services/api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthData } from './models/auth-data.model';
import { User } from '../common/models/user.interface';
import { switchMap, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private authenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
    private currentUserSubject: BehaviorSubject<User> = new BehaviorSubject<User>(null);
    private authTokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    constructor(
        private router: Router,
        private apiService: ApiService
    ) {
    }

    static prepareHeaders({username, password}: Credentials): HttpHeaders {
        return new HttpHeaders()
            .set('Authorization', 'Basic' + ' ' + btoa(`${username}:${password}`));
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

    getAuthenticated(): Observable<boolean> {
        return this.authenticatedSubject.asObservable();
    }

    setAuthenticated(authenticated: boolean) {
        this.authenticatedSubject.next(authenticated);
    }

    getCurrentUser(): Observable<User> {
        return this.currentUserSubject.asObservable();
    }

    setCurrentUser(currentUser: User) {
        this.currentUserSubject.next(currentUser);
    }

    getAuthToken(): Observable<string> {
        return this.authTokenSubject.asObservable();
    }

    setAuthToken(token: string): void {
        this.authTokenSubject.next(token);
    }

    setAuthenticationState(token: string): void {
        this.setAuthToken(token);
        this.setAuthenticated(!!token);
    }

    signIn(credentials: Credentials): Observable<AuthData> {
        return this.apiService.getRequest('users/login', null, AuthService.prepareHeaders(credentials));
    }

    signUp(credentials: Credentials): Observable<{ message: string, user: User }> {
        return this.apiService.postRequest('users/signup', credentials);
    }

    fetchCurrentUser(): Observable<User> {
        return this.apiService.getRequest('users/current');
    }

    redirect(redirectTo: string) {
        this.router.navigateByUrl(redirectTo || '/app');
    }

    performSignIn({credentials, redirectTo}: { credentials: Credentials, redirectTo?: string }): Observable<AuthData> {
        return this.signIn(credentials).pipe(
            tap((authData: AuthData) => {
                AuthService.saveToken(authData.token);
                this.redirect(redirectTo);
            })
        );
    }

    performSignUp({credentials}: { credentials: Credentials, redirectTo?: string }): Observable<AuthData> {
        return this.signUp(credentials).pipe(switchMap(() => this.performSignIn({credentials, redirectTo: ''})));
    }

    performSignOut(): void {
        AuthService.deleteToken();
        this.redirect('/auth');
        this.setAuthenticationState(null);
    }

    loadCurrentUser(): Observable<User> {
        return this.fetchCurrentUser().pipe(
            tap((user: User) => {
                this.setCurrentUser(user);
            })
        );
    }
}
