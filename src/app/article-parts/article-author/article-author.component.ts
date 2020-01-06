import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { User } from '../../common/models/user.interface';

@Component({
    selector: 'article-author',
    templateUrl: './article-author.component.html',
    styleUrls: ['./article-author.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleAuthorComponent {
    @Input() author: User;
    @HostBinding('class.compact') @Input() compact = false;
}
