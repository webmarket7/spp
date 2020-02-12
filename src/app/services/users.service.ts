import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { articleAuthorsMock } from '../common/mocks/article-authors.mock';
import { User } from '../common/models/user.interface';

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    private usersSubject: BehaviorSubject<User[]> = new BehaviorSubject(articleAuthorsMock);

    constructor() {
    }

    getAll(): Observable<User[]> {
        return this.usersSubject.asObservable();
    }
}
