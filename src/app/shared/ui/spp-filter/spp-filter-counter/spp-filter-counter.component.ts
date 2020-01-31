import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'button[spp-filter-counter]',
    templateUrl: './spp-filter-counter.component.html',
    styleUrls: ['./spp-filter-counter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SppFilterCounterComponent {
    @Input() count = 0;

    @HostBinding('style.visibility') get visibility() {
        return this.count ? 'visible' : 'hidden';
    }
}
