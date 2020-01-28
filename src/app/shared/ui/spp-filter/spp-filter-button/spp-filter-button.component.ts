import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'spp-filter-button',
    templateUrl: './spp-filter-button.component.html',
    styleUrls: ['./spp-filter-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SppFilterButtonComponent {
    @Input() label: string;
    @Input() icon: string;
    @Input() selectedFiltersCount: number;

    @Output() reset: EventEmitter<void> = new EventEmitter<void>();

    resetFilter(event: MouseEvent): void {
        event.stopPropagation();
        this.reset.emit();
    }
}
