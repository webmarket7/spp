import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef, EventEmitter,
    Input, OnChanges,
    OnDestroy, Output, SimpleChanges,
    ViewChild
} from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { combineLatest, fromEvent, merge, Subscription, SubscriptionLike } from 'rxjs';
import { map, mapTo, startWith } from 'rxjs/operators';
import { User } from '../../../../store/user/user.model';
import { ArticleComment } from '../../../../store/article-comment/article-comment.model';



@Component({
    selector: 'spp-comment-editor',
    templateUrl: './spp-comment-editor.component.html',
    styleUrls: ['./spp-comment-editor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SppCommentEditorComponent implements AfterViewInit, OnDestroy, OnChanges {

    expanded: boolean;
    expandedSubscription: SubscriptionLike = Subscription.EMPTY;

    commentControl: FormControl = this.fb.control('', [Validators.required]);

    @Input() author: User;
    @Input() mode: 'create' | 'update' = 'create';
    @Input() comment?: ArticleComment;

    @Output() cancelAction: EventEmitter<void> = new EventEmitter<void>();
    @Output() createComment: EventEmitter<{text: string}> = new EventEmitter<{id?: string, text: string}>();
    @Output() updateComment: EventEmitter<{id: string, text: string}> = new EventEmitter<{id: string, text: string}>();

    @ViewChild(CdkTextareaAutosize, {static: false}) autoSize: CdkTextareaAutosize;
    @ViewChild('textarea', {static: false}) textarea: ElementRef<HTMLElement>;

    constructor(private fb: FormBuilder,
                private cdRef: ChangeDetectorRef) {
    }

    ngOnChanges({ comment, mode }: SimpleChanges): void {
        if (mode && mode.currentValue) {
            this.expanded = mode.currentValue === 'update';
        }

        if (this.mode === 'update') {

            if (comment && comment.currentValue) {
                this.commentControl.patchValue(comment.currentValue.text);
            }
        }
    }

    ngAfterViewInit(): void {
        if (this.mode === 'create') {
            this.expandedSubscription = combineLatest(
                this.commentControl.valueChanges.pipe(startWith(''), map((value) => !!value)),
                merge(
                    fromEvent(this.textarea.nativeElement, 'focus').pipe(mapTo(true)),
                    fromEvent(this.textarea.nativeElement, 'blur').pipe(mapTo(false))
                ).pipe(startWith(false))
            )
                .pipe(map(([value, focus]: boolean[]) => value || focus))
                .subscribe((expanded) => {
                    if (this.autoSize) {
                        this.autoSize.reset();
                    }

                    this.expanded = expanded;
                    this.cdRef.markForCheck();
                });
        }
    }

    ngOnDestroy(): void {
        this.expandedSubscription.unsubscribe();
    }

    cancel(event: MouseEvent) {
        event.stopPropagation();
        if (this.mode === 'create') {
            this.commentControl.reset('');
        }
        this.cancelAction.emit();
    }

    save(event: MouseEvent): void {
        event.stopPropagation();

        if (this.commentControl.valid) {
            const text = this.commentControl.value;

            switch (this.mode) {
                case 'create':
                    this.createComment.emit({text});
                    break;
                case 'update':
                    this.updateComment.emit({id: this.comment._id, text});
                    break;
            }

            this.commentControl.reset('');
        }
    }
}
