import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
import { User } from '../store/user/user.model';

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    private endpoint = 'users';

    constructor(private api: ApiService) {
    }

    getAllUsers(): Observable<Array<User>> {
        return this.api.getRequest(this.endpoint);
    }

    getUserById(id: string): Observable<User> {
        return this.api.getRequest(`${this.endpoint}/${id}`);
    }

    updateUser(id: string, formValue: Partial<User>): Observable<User> {
        return this.api.putRequest(`${this.endpoint}/${id}`, formValue)
            .pipe(
                map(res => res.user)
            );
    }

    deleteUserById(id: string) {
        return this.api.deleteRequest(`${this.endpoint}/${id}`);
    }
}
