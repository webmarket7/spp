import { Component, forwardRef, HostBinding, Input } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ConnectedPosition } from '@angular/cdk/overlay';
import { intersectionWith } from 'lodash';
import { ArticleTag } from '../../../../common/models/article-tag.interface';


@Component({
    selector: 'article-tags-selector',
    templateUrl: './article-tags-selector.component.html',
    styleUrls: ['./article-tags-selector.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ArticleTagsSelectorComponent),
            multi: true
        }
    ]
})
export class ArticleTagsSelectorComponent implements ControlValueAccessor {
    @HostBinding('class.disabled') isDisabled: boolean;

    @Input() tags: ArticleTag[] = [];

    positions: ConnectedPosition[] = [
        {
            originX: 'start',
            overlayX: 'start',
            originY: 'bottom',
            overlayY: 'top',
            offsetY: 4
        },
        {
            originX: 'start',
            overlayX: 'start',
            originY: 'top',
            overlayY: 'bottom',
            offsetY: -4
        }
    ];
    open = false;
    currentOverlayPosition: 'bottom' | 'top' | 'center';

    selectedIds: number[] = [];
    selectedTags: ArticleTag[] = [];

    private propagateChange = (value: Array<number | string>) => {
    };
    private propagateTouched = (event: FocusEvent) => {
    };

    constructor(
        private fb: FormBuilder
    ) {
    }

    getSelectedTags(tags, selectedIds): ArticleTag[] {
        return intersectionWith(tags, selectedIds, (tag: ArticleTag, seq: number) => +tag.seq === +seq);
    }

    toggleDropdown(event: MouseEvent): void {
        event.stopPropagation();
        this.open = !this.open;
    }

    onBackdropClick(event: MouseEvent): void {
        event.stopPropagation();
        this.open = false;
    }

    onSelectionChange({selectedIds}: { selectedIds: number[] }): void {
        this.selectedTags = this.getSelectedTags(this.tags, selectedIds);
        this.propagateChange(selectedIds || []);
        this.selectedIds = selectedIds;
    }

    registerOnChange(fn: any): void {
        this.propagateChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.propagateTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.isDisabled = isDisabled;
    }

    writeValue(selectedIds: number[]): void {
        this.selectedIds = selectedIds;
        this.selectedTags = this.getSelectedTags(this.tags, selectedIds);
    }

    deleteTag(event: MouseEvent, articleTagId: number): void {
        event.stopPropagation();
    }
}
