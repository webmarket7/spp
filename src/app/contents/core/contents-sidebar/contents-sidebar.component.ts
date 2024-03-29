import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../../store/user/user.model';
import { selectCurrentUser } from '../../../store/auth/auth.selectors';
import { select, Store } from '@ngrx/store';
import { State } from '../../../store';
import { MenuItem } from '../../../shared/ui/spp-menu-item/menu-item.interface';

@Component({
    selector: 'contents-sidebar',
    templateUrl: './contents-sidebar.component.html',
    styleUrls: ['./contents-sidebar.component.scss']
})
export class ContentsSidebarComponent implements OnInit {

    currentUser$: Observable<User>;
    menu: MenuItem[] = [
        {
            label: 'Articles',
            icon: 'newspaper',
            path: '/app/articles'
        }
    ];

    constructor(private store: Store<State>) {
    }

    ngOnInit(): void {
        this.currentUser$ = this.store.pipe(select(selectCurrentUser));
    }
}
