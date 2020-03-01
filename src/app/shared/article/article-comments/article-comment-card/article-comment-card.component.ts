import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ArticleComment } from '../../../../store/article-comment/article-comment.model';

@Component({
    selector: 'article-comment-card',
    templateUrl: './article-comment-card.component.html',
    styleUrls: ['./article-comment-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleCommentCardComponent {
    @Input() comment: ArticleComment;
}
