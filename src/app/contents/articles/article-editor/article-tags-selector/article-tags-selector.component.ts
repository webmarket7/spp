import { Component, forwardRef, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ConnectedPosition } from '@angular/cdk/overlay';
import { intersectionWith } from 'lodash';
import { ArticleTag } from '../../../../common/models/article-tag.interface';
import { ArticleTagsService } from '../../../../services/article-tags.service';
import { BehaviorSubject, combineLatest, Observable, Subscription, SubscriptionLike } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';
import { AuthService } from '../../../../auth/auth.service';
import { User } from '../../../../common/models/user.interface';


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

    static getSelectedTags(tags, selectedIds): ArticleTag[] {
        return intersectionWith(tags, selectedIds, (tag: ArticleTag, seq: number) => +tag.seq === +seq);
    }

    private propagateChange = (value: Array<number | string>) => {};
    private propagateTouched = (event: FocusEvent) => {};

    constructor(
        private fb: FormBuilder,
        private articleTagsService: ArticleTagsService,
        private authService: AuthService
    ) {
    }

    ngOnInit(): void {
        this.articleTagsService.getAllTags()
            .subscribe((articleTags: ArticleTag[]) => {
                this.articleTagsService.addAll(articleTags);
            });
        this.currentUserSubscription = this.authService.getCurrentUser()
            .subscribe((currentUser: User) => {
                this.currentUser = currentUser;
            });
        this.tags$ = this.articleTagsService.selectArticleTags();
        this.list$ = combineLatest([this.searchControl.valueChanges.pipe(startWith('')), this.tags$]).pipe(
            map(([searchTerm, tags]: [string, ArticleTag[]]) => {
                return tags.filter((tag: ArticleTag) => searchTerm
                    ? RegExp(searchTerm, 'gi').test(tag.name)
                    : true);
            })
        );
        this.selectedTags$ = combineLatest([this.tags$, this.selectedIds$])
            .pipe(map(([tags, selectedIds]) => ArticleTagsSelectorComponent.getSelectedTags(tags, selectedIds)));
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
        this.articleTagsService.createTag(value).subscribe((articleTag: ArticleTag) => {
            this.articleTagsService.addOne(articleTag);
            this.searchControl.reset('');
        });
    }

    deleteTag(event: MouseEvent, articleTagId: number): void {
        event.stopPropagation();
        this.articleTagsService.deleteTagById(articleTagId)
            .subscribe(() => {
                this.articleTagsService.removeOne(articleTagId);
            });
    }
}
