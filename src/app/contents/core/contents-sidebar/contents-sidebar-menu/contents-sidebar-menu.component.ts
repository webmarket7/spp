import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MenuItem } from '../../../../common/models/menu-item.interface';

@Component({
    selector: 'contents-sidebar-menu',
    templateUrl: './contents-sidebar-menu.component.html',
    styleUrls: ['./contents-sidebar-menu.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentsSidebarMenuComponent {

    menuItems: MenuItem[] = [
        {
            label: 'Articles',
            icon: 'newspaper',
            path: 'articles'
        }
    ];

    constructor() {
    }

    trackByFn(index: number) {
        return index;
    }
}
