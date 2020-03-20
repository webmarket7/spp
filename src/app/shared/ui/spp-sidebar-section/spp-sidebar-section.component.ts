import { ChangeDetectionStrategy, Component, Input } from '@angular/core';


@Component({
    selector: 'spp-sidebar-section',
    templateUrl: './spp-sidebar-section.component.html',
    styleUrls: ['./spp-sidebar-section.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SppSidebarSectionComponent {
    @Input() header: string;

    constructor() {
    }
}
