import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, exhaustMap, map } from 'rxjs/operators';
import { of } from 'rxjs';

import * as AuthActions from './auth.actions';
import { User } from '../user/user.model';
import { AuthService } from '../../services/auth.service';


@Injectable()
export class AuthEffects {

    signIn$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AuthActions.signIn),
            exhaustMap(({credentials, redirectTo}) => {
                return this.authService.signIn(credentials).pipe(
                    map(authData => {
                        AuthService.saveToken(authData.token);
                        this.authService.redirect(redirectTo);

                        return AuthActions.signInSuccess({authData, redirectTo});
                    }),
                    catchError(error => of(AuthActions.signInFailure({error})))
                );
            })
        );
    });

    signUp$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AuthActions.signUp),
            exhaustMap(({credentials}) => {
                return this.authService.signUp(credentials).pipe(
                    map(authData => {
                        return AuthActions.signIn({credentials});
                    }),
                    catchError(error => of(AuthActions.signUpFailure({error})))
                );
            })
        );
    });

    signOut$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AuthActions.signOut),
            map(() => {
                AuthService.deleteToken();
                this.authService.redirect('/auth');

                return AuthActions.signOutSuccess();
            }),
            catchError((error) => of(AuthActions.signOutFailure()))
        );
    });

    loadCurrentUser$ = createEffect(() => {
       return this.actions$.pipe(
           ofType(AuthActions.loadCurrentUser),
           concatMap(() => this.authService.getCurrentUser()),
           map((user: User) => AuthActions.loadCurrentUserSuccess({user})),
           catchError((error) => of(AuthActions.loadCurrentUserFailure({error})))
       );
    });

    constructor(
        private actions$: Actions,
        private authService: AuthService,
    ) {
    }
}
