import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ArticleTag } from '../../common/models/article-tag.interface';

@Component({
    selector: 'article-tags',
    templateUrl: './article-tags.component.html',
    styleUrls: ['./article-tags.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleTagsComponent {

    @Input() tags: ArticleTag[];
    @Input() limit?: number;

    trackByFn = (index: number, item: ArticleTag): number => item.seq;

    constructor() {
    }
}
