import { Component } from '@angular/core';
import { FullArticle } from '../../../../common/models/article.interface';
import { fullArticlesList } from '../../../../common/mocks/article.mock';

@Component({
    selector: 'articles-tiles-view',
    templateUrl: './articles-tiles-view.component.html',
    styleUrls: ['./articles-tiles-view.component.scss']
})
export class ArticlesTilesViewComponent {

    articles: FullArticle[] = fullArticlesList;
    cardType = 'tile';

    constructor() {
    }

    trackByFn(index: number, item: FullArticle): string {
        return item.id;
    }
}
