import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FullArticle } from '../../../../common/models/article.interface';
import { ArticlesService } from '../../../../services/articles.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'articles-default-view',
    templateUrl: './articles-default-view.component.html',
    styleUrls: ['./articles-default-view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticlesDefaultViewComponent implements OnInit {

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
