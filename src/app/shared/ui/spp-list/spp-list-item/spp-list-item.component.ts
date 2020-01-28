import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'spp-list-item',
    templateUrl: './spp-list-item.component.html',
    styleUrls: ['./spp-list-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SppListItemComponent {
}
