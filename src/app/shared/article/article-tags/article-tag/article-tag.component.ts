import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ArticleTag } from '../../../../common/models/article-tag.interface';

@Component({
    selector: 'article-tag',
    templateUrl: './article-tag.component.html',
    styleUrls: ['./article-tag.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleTagComponent {
    @Input() tag: ArticleTag;
}
