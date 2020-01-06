import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FullArticle } from '../../../../common/models/article.interface';
import { fullArticlesList } from '../../../../common/mocks/article.mock';

@Component({
    selector: 'articles-default-view',
    templateUrl: './articles-default-view.component.html',
    styleUrls: ['./articles-default-view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticlesDefaultViewComponent {
    articles: FullArticle[] = fullArticlesList;

    constructor() {
    }

    trackByFn(index: number, item: FullArticle): string {
        return item.id;
    }
}
