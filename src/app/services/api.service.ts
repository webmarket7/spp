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

    static prepareParams(params: any): HttpParams {
        return params ? new HttpParams({fromObject: params}) : null;
    }

    static prepareHeaders(headers: any): HttpHeaders {
        return headers ? new HttpHeaders(headers) : null;
    }

    static prepareOptions(paramsObj?: any, headersObj?: any): {params?: HttpParams, headers?: HttpHeaders}  {
        const params = ApiService.prepareParams(paramsObj);
        const headers = ApiService.prepareHeaders(headersObj);

        return {
            ...(params && {params}),
            ...(headers && {headers})
        };
    }

    getEndpoint(url: string): string {
        return `${environment.api}${url}`;
    }

    postRequest(url: string, body: any, params?: any, headers?: any): Observable<any> {
        return this.http.post(this.getEndpoint(url), body, ApiService.prepareOptions(params, headers));
    }

    getRequest(url: string, params?: any, headers?: any): Observable<any> {
        return this.http.get(this.getEndpoint(url), ApiService.prepareOptions(params, headers));
    }

    putRequest(url: string, body: any, params?: any, headers?: any): Observable<any> {
        return this.http.put(this.getEndpoint(url), body, ApiService.prepareOptions(params, headers));
    }

    deleteRequest(url: string): Observable<any> {
        return this.http.delete(this.getEndpoint(url));
    }
}

