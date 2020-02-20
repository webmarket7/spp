import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(
        private http: HttpClient
    ) {}

    static prepareParams(params): HttpParams {
        if (!params) {
            return null;
        }

        let httpParams: HttpParams = new HttpParams();

        for (const item in params) {
            if (params.hasOwnProperty(item)) {
                httpParams = httpParams.append(item, params[item]);
            }
        }

        return httpParams;
    }

    static prepareOptions(params?: any, headers?: HttpHeaders) {
        return {
            params: ApiService.prepareParams(params),
            headers: headers || null
        };
    }

    getEndpoint(url: string): string {
        return `${environment.api}${url}`;
    }

    postRequest(url: string, body, params?: any, headers?: HttpHeaders): Observable<any> {
        return this.http.post(this.getEndpoint(url), body, ApiService.prepareOptions(params, headers));
    }

    getRequest(url: string, params?: any, headers?: HttpHeaders): Observable<any> {
        return this.http.get(this.getEndpoint(url), ApiService.prepareOptions(params, headers));
    }

    putRequest(url: string, body, params?: any, headers?: HttpHeaders): Observable<any> {
        return this.http.put(this.getEndpoint(url), body, ApiService.prepareOptions(params, headers));
    }

    deleteRequest(url: string): Observable<any> {
        return this.http.delete(this.getEndpoint(url));
    }
}

