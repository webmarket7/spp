import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../common/models/user.interface';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
import { keyBy } from 'lodash';

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    private endpoint = 'users';
    private usersSubject: BehaviorSubject<User[]> = new BehaviorSubject([]);

    constructor(private api: ApiService) {
    }

    selectAllUsers(): Observable<User[]> {
        return this.usersSubject.asObservable();
    }

    selectUsersDictionary(): Observable<{ [key: string]: User }> {
        return this.selectAllUsers().pipe(map((users: User[]) => {
            return keyBy(users, 'id');
        }));
    }

    addAll(users: User[]): void {
        this.usersSubject.next(users);
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
