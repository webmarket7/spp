import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { User } from '../../../../common/models/user.interface';

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
