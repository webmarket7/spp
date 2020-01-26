import { Component } from '@angular/core';
import { FullArticle } from '../../../../common/models/article.interface';
import { fullArticlesList } from '../../../../common/mocks/article.mock';

@Component({
    selector: 'articles-list-view',
    templateUrl: './articles-list-view.component.html',
    styleUrls: ['./articles-list-view.component.scss']
})
export class ArticlesListViewComponent {

    articles: FullArticle[] = fullArticlesList;
    cardType = 'list-item';

    constructor() {
    }

    trackByFn(index: number, item: FullArticle): string {
        return item.id;
    }
}
