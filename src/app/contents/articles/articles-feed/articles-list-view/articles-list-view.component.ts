import { Component, OnInit } from '@angular/core';
import { FullArticle } from '../../../../common/models/article.interface';
import { Observable } from 'rxjs';
import { ArticlesService } from '../../../../services/articles.service';

@Component({
    selector: 'articles-list-view',
    templateUrl: './articles-list-view.component.html',
    styleUrls: ['./articles-list-view.component.scss']
})
export class ArticlesListViewComponent implements OnInit {

    cardType = 'list-item';
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
