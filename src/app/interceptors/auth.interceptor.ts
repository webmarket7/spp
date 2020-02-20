import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, first, flatMap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';


@Injectable({
    providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) {
    }

    private handleError(errorResponse: HttpErrorResponse) {

        switch (errorResponse.status) {
            case 400:
                alert(errorResponse.error.message);
                break;

            case 401:
                this.authService.performSignOut();
                break;
        }

        return throwError(errorResponse);
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.authService.getAuthToken().pipe(
            first(),
            flatMap((token: string) => {
                let request = req;

                if (token) {
                    request = req.clone({
                        headers: req.headers.append('Authorization', `Bearer ${token}`)
                    });
                }

                return next.handle(request).pipe(catchError(this.handleError));
            })
        );
    }
}
