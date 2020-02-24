import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FullArticle } from '../../../../common/models/article.interface';
import { ArticlesService } from '../../../../services/articles.service';
import { Observable, Subscription, SubscriptionLike } from 'rxjs';
import { User } from '../../../../common/models/user.interface';
import { AuthService } from '../../../../auth/auth.service';

@Component({
    selector: 'articles-default-view',
    templateUrl: './articles-default-view.component.html',
    styleUrls: ['./articles-default-view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticlesDefaultViewComponent implements OnInit, OnDestroy {

    currentUserSubscription: SubscriptionLike = Subscription.EMPTY;
    currentUser: User;

    articles$: Observable<FullArticle[]>;

    constructor(
        private articlesService: ArticlesService,
        private authService: AuthService
    ) {}

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
