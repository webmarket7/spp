import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { User } from '../../../../store/user/user.model';

@Component({
    selector: 'contents-sidebar-user',
    templateUrl: './contents-sidebar-user.component.html',
    styleUrls: ['./contents-sidebar-user.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentsSidebarUserComponent {

    @Input() currentUser: User;

    constructor() {
    }
}
