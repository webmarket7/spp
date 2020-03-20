import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MenuItem } from '../../../../shared/ui/spp-menu-item/menu-item.interface';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'nav[contents-sidebar-menu]',
    templateUrl: './contents-sidebar-menu.component.html',
    styleUrls: ['./contents-sidebar-menu.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentsSidebarMenuComponent {

    @Input() menuItems: MenuItem[];

    constructor() {
    }

    trackByFn(index: number) {
        return index;
    }
}
