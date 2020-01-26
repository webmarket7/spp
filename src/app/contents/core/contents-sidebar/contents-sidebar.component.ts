import { Component } from '@angular/core';
import { UserMock } from '../../../common/mocks/user.mock';
import { User } from '../../../common/models/user.interface';

@Component({
    selector: 'contents-sidebar',
    templateUrl: './contents-sidebar.component.html',
    styleUrls: ['./contents-sidebar.component.scss']
})
export class ContentsSidebarComponent {

    currentUser: User = new UserMock('http://robohash.org/set_set1/bgset_bg2/kQqaIfGqxsjFoNIT', 'Zooey', 'Deschanel');

    constructor() {
    }
}
