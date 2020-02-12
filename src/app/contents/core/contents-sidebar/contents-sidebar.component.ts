import { Component, OnInit } from '@angular/core';
import { User } from '../../../common/models/user.interface';
import { GlobalService } from '../../../services/global.service';

@Component({
    selector: 'contents-sidebar',
    templateUrl: './contents-sidebar.component.html',
    styleUrls: ['./contents-sidebar.component.scss']
})
export class ContentsSidebarComponent implements OnInit {

    currentUser: User;

    constructor(private globalService: GlobalService) {
    }

    ngOnInit() {
        this.currentUser = this.globalService.currentUser;
    }
}
