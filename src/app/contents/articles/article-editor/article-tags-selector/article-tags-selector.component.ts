import { Component, forwardRef, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ConnectedPosition } from '@angular/cdk/overlay';
import { Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest, Observable, Subscription, SubscriptionLike } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { intersectionWith } from 'lodash';

import { State } from '../../../../store';
import { User } from '../../../../store/user/user.model';
import { ArticleTag } from '../../../../store/article-tag/article-tag.model';
import { createTag, loadAllTags, deleteTag } from '../store/article-editor.actions';
import { selectAllTags } from '../store/article-editor.selectors';
import { selectCurrentUser } from '../../../../store/auth/auth.selectors';


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
export class ArticleTagsSelectorComponent implements OnInit, OnDestroy, ControlValueAccessor {
    @HostBinding('class.disabled') isDisabled: boolean;

    searchControl: FormControl = this.fb.control('');
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

    currentUserSubscription: SubscriptionLike = Subscription.EMPTY;
    currentUser: User;

    tags$: Observable<ArticleTag[]>;
    selectedIds: BehaviorSubject<Array<number | string>> = new BehaviorSubject([]);
    selectedIds$: Observable<Array<number | string>> = this.selectedIds.asObservable();
    list$: Observable<ArticleTag[]>;
    selectedTags$: Observable<ArticleTag[]>;

    private propagateChange = (value: Array<number | string>) => {
    };
    private propagateTouched = (event: FocusEvent) => {
    };

    constructor(
        private fb: FormBuilder,
        private store: Store<State>,
    ) {
    }

    ngOnInit(): void {
        this.store.dispatch(loadAllTags());
        this.tags$ = this.store.select(selectAllTags);
        this.currentUserSubscription = this.store.select(selectCurrentUser)
            .subscribe((currentUser: User) => {
                this.currentUser = currentUser;
            });

        this.list$ = combineLatest(this.searchControl.valueChanges.pipe(startWith('')), this.tags$).pipe(
            map(([searchTerm, tags]: [string, ArticleTag[]]) => {
                return tags.filter((tag: ArticleTag) => searchTerm
                    ? RegExp(searchTerm, 'gi').test(tag.name)
                    : true);
            })
        );
        this.selectedTags$ = combineLatest(this.tags$, this.selectedIds$)
            .pipe(map(([tags, selectedIds]) => intersectionWith(tags, selectedIds, (tag: ArticleTag, seq: number) => +tag.seq === +seq)));
    }

    ngOnDestroy(): void {
        this.currentUserSubscription.unsubscribe();
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
        const ids = selectedIds || [];

        this.selectedIds.next(ids);
        this.propagateChange(ids);
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
        this.selectedIds.next(selectedIds || []);
    }

    createNewTag({value}: { value: string }): void {
        this.searchControl.reset('');
        this.store.dispatch(createTag({name: value}));
    }

    deleteTag(event: MouseEvent, articleTagId: number): void {
        event.stopPropagation();
        this.store.dispatch(deleteTag({articleTagId}));
    }
}
