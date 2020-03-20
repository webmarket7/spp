import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ArticleComment } from '../../../../store/article-comment/article-comment.model';
import { User } from '../../../../store/user/user.model';


@Component({
    selector: 'article-comments',
    templateUrl: './article-comments.component.html',
    styleUrls: ['./article-comments.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleCommentsComponent {
    @Input() currentUser: User;
    @Input() comments: ArticleComment[];

    editedCommentId: string;

    @Output() createComment: EventEmitter<{text: string}> = new EventEmitter<{id?: string, text: string}>();
    @Output() updateComment: EventEmitter<{id: string, text: string}> = new EventEmitter<{id: string, text: string}>();
    @Output() deleteComment: EventEmitter<{id: string}> = new EventEmitter<{id: string}>();

    constructor() {
    }

    trackByFn(index: number, item: ArticleComment): string {
        return item._id;
    }

    switchEditMode(id: string) {
        this.editedCommentId = id;
    }

    onUpdateComment(event: { id: string; text: string }): void {
        this.updateComment.emit(event);
        this.editedCommentId = null;
    }
}
