import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';

@Component({
    selector: 'article-likes',
    templateUrl: './article-likes.component.html',
    styleUrls: ['./article-likes.component.scss', '../styles/article-reactions.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleLikesComponent {
    @HostBinding('class.active') @Input() liked: boolean;
    @Input() likes: number;

    @Output() toggle: EventEmitter<void> = new EventEmitter<void>();

    toggleState(event: MouseEvent): void {
        event.stopPropagation();
        this.toggle.emit();
    }
}
