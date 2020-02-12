import { Injectable } from '@angular/core';
import { UserMock } from '../common/mocks/user.mock';

@Injectable({
    providedIn: 'root'
})
export class GlobalService {

    currentUser = new UserMock('http://robohash.org/set_set1/bgset_bg2/kQqaIfGqxsjFoNIT', 'Oleksandr', 'Ryzhyk');

    constructor() {
    }
}
