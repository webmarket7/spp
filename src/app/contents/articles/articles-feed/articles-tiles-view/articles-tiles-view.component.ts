import { Component, OnInit } from '@angular/core';
import { FullArticle } from '../../../../common/models/article.interface';
import { Observable } from 'rxjs';
import { ArticlesService } from '../../../../services/articles.service';

@Component({
    selector: 'articles-tiles-view',
    templateUrl: './articles-tiles-view.component.html',
    styleUrls: ['./articles-tiles-view.component.scss']
})
export class ArticlesTilesViewComponent implements OnInit {

    cardType = 'tile';
    articles$: Observable<FullArticle[]>;

    constructor(private articlesService: ArticlesService) {
    }

    ngOnInit(): void {
        this.articles$ = this.articlesService.getAll();
    }

    trackByFn(index: number, item: FullArticle): string {
        return item.id;
    }
}
