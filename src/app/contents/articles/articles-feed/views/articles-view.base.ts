import { Observable, Subscription, SubscriptionLike } from 'rxjs';
import { User } from '../../../../store/user/user.model';
import { FullArticle } from '../../../../store/article/article.model';
import { select, Store } from '@ngrx/store';
import { State } from '../../../../store';
import { selectArticlesFeed } from '../store/articles-feed.selectors';
import { selectCurrentUser } from '../../../../store/auth/auth.selectors';
import { OnDestroy, OnInit } from '@angular/core';

export class ArticlesViewBase implements OnInit, OnDestroy {
    currentUserSubscription: SubscriptionLike = Subscription.EMPTY;
    currentUser: User;
    articles$: Observable<FullArticle[]>;

    constructor(public store: Store<State>) {
    }

    ngOnInit(): void {
        this.articles$ = this.store.pipe(select(selectArticlesFeed));
        this.currentUserSubscription = this.store.pipe(select(selectCurrentUser)).subscribe((currentUser: User) => {
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
