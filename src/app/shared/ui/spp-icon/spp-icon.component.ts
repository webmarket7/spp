import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'spp-icon',
    templateUrl: './spp-icon.component.html',
    styleUrls: ['./spp-icon.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SppIconComponent {
    @Input() icon: string;
}
