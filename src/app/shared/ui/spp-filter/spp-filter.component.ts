import { ChangeDetectionStrategy, Component, ContentChild, Input, OnInit, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { ConnectedPosition } from '@angular/cdk/overlay';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
    selector: 'spp-filter',
    templateUrl: './spp-filter.component.html',
    styleUrls: ['./spp-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SppFilterComponent implements OnInit {

    @Input() name: string;
    @Input() label: string;
    @Input() icon: string;
    @Input() optionIdKey = 'id';
    @Input() dataSource: any[];

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
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) {
    }

    selectedIds$: Observable<Array<number | string>>;

    @ContentChild(TemplateRef, {static: false}) listOptionTemplateRef: TemplateRef<any>;

    ngOnInit(): void {
        this.selectedIds$ = this.activatedRoute.queryParamMap.pipe(map((queryParamMap: ParamMap) => {
            const queryParamsString = queryParamMap.get(this.name);

            return queryParamsString && queryParamsString.length
                ? queryParamsString.split(this.separator)
                : [];
        }));
    }

    changeQueryParams(ids: Array<string | number>): void {
        this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParams: {
                [this.name]: ids.join(this.separator) || null
            },
            queryParamsHandling: 'merge'
        });
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
        this.changeQueryParams(selectedIds);
    }

    resetFilter(): void {
        this.changeQueryParams([]);
    }
}
