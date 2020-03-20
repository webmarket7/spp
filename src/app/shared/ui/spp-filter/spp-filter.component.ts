import { ChangeDetectionStrategy, Component, ContentChild, Input, OnInit, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';
import { FormBuilder, FormControl } from '@angular/forms';
import { ConnectedPosition } from '@angular/cdk/overlay';
import { startWith } from 'rxjs/operators';
import { filterAnimation } from '../../../common/animations';
import { SppFilterService } from './services/spp-filter.service';

@Component({
    selector: 'spp-filter',
    templateUrl: './spp-filter.component.html',
    styleUrls: ['./spp-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [filterAnimation]
})
export class SppFilterComponent implements OnInit {

    @Input() name: string;
    @Input() label: string;
    @Input() icon: string;
    @Input() optionIdKey = 'id';
    @Input() dataSource: Observable<any[]>;
    @Input() searchParam = 'name';

    searchControl: FormControl = this.fb.control('');

    positions: ConnectedPosition[] = [
        {
            originX: 'end',
            overlayX: 'start',
            originY: 'top',
            overlayY: 'top',
            offsetX: 10
        },
        {
            originX: 'end',
            overlayX: 'start',
            originY: 'top',
            overlayY: 'bottom',
            offsetX: 10
        }
    ];
    open = false;
    separator = ',';

    constructor(
        private fb: FormBuilder,
        private sppFilterService: SppFilterService
    ) {
    }

    search$: Observable<string>;
    list$: Observable<any[]>;
    selectedIds$: Observable<Array<number | string>>;

    @ContentChild(TemplateRef, {static: false}) listOptionTemplateRef: TemplateRef<any>;

    ngOnInit(): void {
        this.search$ = this.searchControl.valueChanges.pipe(startWith(''));
        this.selectedIds$ = this.sppFilterService.getSelectedIds(this.name);
        this.list$ = this.sppFilterService.getList([this.search$, this.dataSource], this.searchParam);
    }

    toggleDropdown(event: MouseEvent): void {
        event.stopPropagation();
        this.open = !this.open;
    }

    onBackdropClick(event: MouseEvent): void {
        event.stopPropagation();
        this.open = false;
    }

    applyFilter({selectedIds}: { selectedIds: Array<number | string> }): void {
        this.sppFilterService.changeQueryParams(selectedIds, this.name, this.separator);
    }

    resetFilter(): void {
        this.sppFilterService.changeQueryParams([], this.name, this.separator);
    }
}
