import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'contents-sidebar-top',
    templateUrl: './contents-sidebar-top.component.html',
    styleUrls: ['./contents-sidebar-top.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentsSidebarTopComponent {

    constructor() {
    }
}
