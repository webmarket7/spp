import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef, EventEmitter,
    Input,
    OnDestroy, Output,
    ViewChild
} from '@angular/core';
import { fromEvent, Subscription, SubscriptionLike } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { User } from '../../../../store/user/user.model';


@Component({
    selector: 'spp-comment',
    templateUrl: './spp-comment.component.html',
    styleUrls: ['./spp-comment.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SppCommentComponent implements AfterViewInit, OnDestroy {
    collapsed = true;
    overflown = false;
    windowResizeSubscription: SubscriptionLike = Subscription.EMPTY;

    @Input() currentUser: User;
    @Input() author: User;
    @Input() text: string;
    @Input() date: Date;

    @Input() readonly: boolean;

    @Output() switchEditMode: EventEmitter<void> = new EventEmitter<void>();
    @Output() deleteComment: EventEmitter<void> = new EventEmitter<void>();

    @ViewChild('textRef', {static: false}) textRef: ElementRef<HTMLElement>;

    constructor(private cdRef: ChangeDetectorRef) {
    }

    ngAfterViewInit(): void {
        this.checkOverflow();

        this.windowResizeSubscription = fromEvent(window, 'resize')
            .pipe(
                debounceTime(200)
            )
            .subscribe(() => {
                this.checkOverflow();
            });
    }

    ngOnDestroy(): void {
        this.windowResizeSubscription.unsubscribe();
    }

    checkOverflow() {
        const previousState = this.collapsed;

        this.cdRef.detach();
        this.collapsed = true;
        this.cdRef.detectChanges();
        if (this.textRef) {
            const el = this.textRef.nativeElement;

            this.overflown = el.scrollHeight > el.clientHeight;
        }
        this.collapsed = previousState;
        this.cdRef.detectChanges();
        this.cdRef.reattach();
    }

    toggleComment(event: MouseEvent): void {
        event.stopPropagation();

        this.collapsed = !this.collapsed;
    }
}
