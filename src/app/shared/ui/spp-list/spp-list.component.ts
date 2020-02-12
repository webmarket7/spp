import {
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    EventEmitter,
    Input,
    OnChanges, OnDestroy,
    OnInit,
    Output, SimpleChanges,
    TemplateRef
} from '@angular/core';

@Component({
    selector: 'spp-list',
    templateUrl: './spp-list.component.html',
    styleUrls: ['./spp-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SppListComponent implements OnInit, OnChanges, OnDestroy {

    selectedIdsMap: Map<string, any> = new Map();

    @Input() list: Array<any> = [];
    @Input() identifier = 'id';
    @Input() selectedIds: Array<string | number> = [];
    @Input() nothingFoundText: string;

    @Output() selectionChange: EventEmitter<{ selectedIds: Array<string | number> }>;
    @Output() done: EventEmitter<{ selectedIds: Array<string | number> }>;

    @ContentChild(TemplateRef, {static: false}) itemTemplate: TemplateRef<any>;

    constructor() {
        this.selectionChange = new EventEmitter<{ selectedIds: Array<string> }>();
        this.done = new EventEmitter<{ selectedIds: Array<string> }>();
    }

    ngOnInit(): void {
        this.list = this.sortSelectedToTop(this.list);
    }

    ngOnChanges(changes: SimpleChanges): void {
        const {selectedIds} = changes;
        console.log({selectedIds});

        if (selectedIds && selectedIds.currentValue) {
            const arr = selectedIds.currentValue;
            const selectedIdsMap = new Map();

            if (arr && Array.isArray(arr) && arr.length) {
                // Replace current Map only if new Map is different
                arr.forEach((id: string | number) => {
                    const normalizedId = `${id}`;

                    if (!this.selectedIdsMap.has(normalizedId)) {
                        selectedIdsMap.set(normalizedId, null);
                    }
                });

                if (selectedIdsMap.size) {
                    this.selectedIdsMap = selectedIdsMap;
                }
            } else {
                this.selectedIdsMap = selectedIdsMap;
            }
        }
    }

    ngOnDestroy(): void {
        this.done.emit({selectedIds: this.getSelectedIds()});
    }

    getSelectedIds(): Array<string> {
        return Array.from(this.selectedIdsMap.keys());
    }

    isSelected(item: any): boolean {
        return this.selectedIdsMap.has(`${item[this.identifier]}`);
    }

    sortSelectedToTop(list: any[]): any[] {
        return list.sort((a: any, b: any) => {
            return +this.selectedIdsMap.has(b[this.identifier]) - +this.selectedIdsMap.has(a[this.identifier]);
        });
    }

    onItemSelected(event: MouseEvent, item: any): void {
        event.stopPropagation();

        if (item) {
            const id = `${item[this.identifier]}`;

            if (this.selectedIdsMap.has(id)) {
                this.selectedIdsMap.delete(id);
            } else {
                this.selectedIdsMap.set(id, null);
            }
        }

        this.selectionChange.emit({selectedIds: this.getSelectedIds()});
    }

    trackByFn(index: number): number {
        return index;
    }
}
