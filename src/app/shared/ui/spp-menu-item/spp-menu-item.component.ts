import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'a[spp-menu-item], button[spp-menu-item], spp-menu-item',
    templateUrl: './spp-menu-item.component.html',
    styleUrls: ['./spp-menu-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SppMenuItemComponent {
    @Input() icon: string;
    @Input() label: string;

    constructor() {
    }
}

