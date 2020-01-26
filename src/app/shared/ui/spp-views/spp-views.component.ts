import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MenuItem } from '../../../common/models/menu-item.interface';


@Component({
    selector: 'spp-views',
    templateUrl: './spp-views.component.html',
    styleUrls: ['./spp-views.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SppViewsComponent {
    @Input() views: MenuItem[];

    constructor() {
    }

    trackByFn(index: number) {
        return index;
    }
}
