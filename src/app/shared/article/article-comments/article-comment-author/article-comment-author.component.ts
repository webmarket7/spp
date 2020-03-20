import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { User } from '../../../../store/user/user.model';


@Component({
    selector: 'article-comment-author',
    templateUrl: './article-comment-author.component.html',
    styleUrls: ['./article-comment-author.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleCommentAuthorComponent {
    @Input() author: User;
}
