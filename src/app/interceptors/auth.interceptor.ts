import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, first, flatMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Store } from '@ngrx/store';
import { State } from '../store';
import { selectAuthToken } from '../store/auth/auth.selectors';
import { signOut } from '../store/auth/auth.actions';


@Injectable({
    providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService,
                private store: Store<State>) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return this.store.select(selectAuthToken).pipe(
            first(),
            flatMap((token: string) => {
                let request = req;

                request = req.clone({
                    headers: req.headers.append('Accept', 'application/json')
                });

                if (token) {
                    request = req.clone({
                        headers: req.headers.append('Authorization', `Bearer ${token}`)
                    });
                }

                return next.handle(request).pipe(
                    catchError((errorResponse: HttpErrorResponse) => {
                        const clonedError = {...errorResponse};
                        const status = clonedError.status;

                        if (status === 400) {
                            alert(errorResponse.error.message);
                        }

                        if (status === 401) {
                            this.store.dispatch(signOut());
                        }

                        return throwError(errorResponse);
                    })
                );
            })
        );
    }
}
