import { ChangeDetectionStrategy, Component, HostBinding, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
    selector: 'spp-user-pic',
    templateUrl: './spp-user-pic.component.html',
    styleUrls: ['./spp-user-pic.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SppUserPicComponent implements OnChanges {
    defaultSize = 40;

    @HostBinding('class.edge') @Input() edge = true;
    @HostBinding('style.width.px') @Input() containerWidth = this.defaultSize;
    @HostBinding('style.height.px') @Input() containerHeight = this.defaultSize;

    @Input() containerSize = this.defaultSize;
    @Input() picture: string;
    @Input() icon = 'user';
    @Input() iconSize = 24;

    ngOnChanges(changes: SimpleChanges): void {
        const { containerSize } = changes;

        if (containerSize) {
            const currentValue = containerSize.currentValue;

            this.containerWidth = currentValue || this.defaultSize;
            this.containerHeight = currentValue || this.defaultSize;
        }
    }
}
