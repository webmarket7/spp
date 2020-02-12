import { Component, OnDestroy, OnInit } from '@angular/core';
import { FullArticle } from '../../../common/models/article.interface';
import { Observable, Subscription, SubscriptionLike } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../services/articles.service';
import { ActivatedRoute, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Location } from '@angular/common';

@Component({
    selector: 'article-page',
    templateUrl: './article-page.component.html',
    styleUrls: ['./article-page.component.scss']
})
export class ArticlePageComponent implements OnInit, OnDestroy {

    article$: Observable<FullArticle>;
    articleSubscription: SubscriptionLike = Subscription.EMPTY;
    article: FullArticle;

    likesCount = 0;
    liked = false;
    favsCount = 0;
    favorite = false;

    constructor(private title: Title,
                private articlesService: ArticlesService,
                private activatedRoute: ActivatedRoute,
                private location: Location) {
    }

    ngOnInit(): void {
        this.article$ = this.articlesService.getOne(this.activatedRoute.snapshot.paramMap.get('articleId'));

        this.articleSubscription = this.article$
            .pipe(filter((article: FullArticle) => !!article))
            .subscribe((article: FullArticle) => {
                this.article = article;
                this.title.setTitle(article.title);
            });
    }

    ngOnDestroy(): void {
        this.articleSubscription.unsubscribe();
    }

    toggleLike(): void {
    }

    toggleFav(): void {
    }

    deleteArticle(event: MouseEvent, articleId: string): void {
        this.articlesService.removeOne(articleId);
        this.location.back();
    }
}
