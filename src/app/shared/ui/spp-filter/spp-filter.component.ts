import { ChangeDetectionStrategy, Component, ContentChild, Input, OnInit, TemplateRef } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { FormBuilder, FormControl } from '@angular/forms';
import { ConnectedPosition } from '@angular/cdk/overlay';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { map, startWith } from 'rxjs/operators';
import { ArticleTag } from '../../../common/models/article-tag.interface';

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
    @Input() dataSource: Observable<any[]>;

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
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) {
    }

    list$: Observable<any[]>;
    selectedIds$: Observable<Array<number | string>>;

    @ContentChild(TemplateRef, {static: false}) listOptionTemplateRef: TemplateRef<any>;

    ngOnInit(): void {
        this.selectedIds$ = this.activatedRoute.queryParamMap.pipe(map((queryParamMap: ParamMap) => {
            const queryParamsString = queryParamMap.get(this.name);

            return queryParamsString && queryParamsString.length
                ? queryParamsString.split(this.separator)
                : [];
        }));

        this.list$ = combineLatest(this.searchControl.valueChanges.pipe(startWith('')), this.dataSource).pipe(
            map(([searchTerm, entities]: [string, any[]]) => {
                return entities.filter((tag: ArticleTag) => searchTerm
                    ? RegExp(searchTerm, 'gi').test(tag.name)
                    : true);
            })
        );
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
