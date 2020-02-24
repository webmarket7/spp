import { Component, OnInit } from '@angular/core';
import { User } from '../../../common/models/user.interface';
import { AuthService } from '../../../auth/auth.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'contents-sidebar',
    templateUrl: './contents-sidebar.component.html',
    styleUrls: ['./contents-sidebar.component.scss']
})
export class ContentsSidebarComponent implements OnInit {

    currentUser$: Observable<User>;

    constructor(private authService: AuthService) {
    }

    ngOnInit() {
        this.currentUser$ = this.authService.getCurrentUser();
    }
}
