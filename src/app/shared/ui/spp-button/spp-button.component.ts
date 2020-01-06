import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'button[spp-button], spp-button',
    templateUrl: './spp-button.component.html',
    styleUrls: ['./spp-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SppButtonComponent {
    @Input() label: string;
}
