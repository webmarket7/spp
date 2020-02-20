import { Component, OnDestroy, OnInit } from '@angular/core';
import { FullArticle } from '../../../../common/models/article.interface';
import { Observable, Subscription, SubscriptionLike } from 'rxjs';
import { ArticlesService } from '../../../../services/articles.service';
import { User } from '../../../../common/models/user.interface';
import { AuthService } from '../../../../auth/auth.service';

@Component({
    selector: 'articles-tiles-view',
    templateUrl: './articles-tiles-view.component.html',
    styleUrls: ['./articles-tiles-view.component.scss']
})
export class ArticlesTilesViewComponent implements OnInit, OnDestroy {

    currentUserSubscription: SubscriptionLike = Subscription.EMPTY;
    currentUser: User;

    cardType = 'tile';
    articles$: Observable<FullArticle[]>;

    constructor(
        private articlesService: ArticlesService,
        private authService: AuthService
    ) {
    }

    ngOnInit(): void {
        this.articles$ = this.articlesService.selectFullArticles();
        this.currentUserSubscription = this.authService.getCurrentUser().subscribe((currentUser: User) => {
            this.currentUser = currentUser;
        });
    }

    ngOnDestroy(): void {
        this.currentUserSubscription.unsubscribe();
    }

    trackByFn(index: number, item: FullArticle): string {
        return item.id;
    }
}
