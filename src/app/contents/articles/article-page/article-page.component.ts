import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription, SubscriptionLike } from 'rxjs';
import { filter, map, switchMap, withLatestFrom } from 'rxjs/operators';

import { User } from '../../../store/user/user.model';
import { Article } from '../../../store/article/article.model';
import { ArticleTag } from '../../../store/article-tag/article-tag.model';
import { State } from '../../../store';
import {
    createArticleComment,
    deleteArticle,
    deleteArticleComment,
    loadArticle,
    loadArticleComments,
    updateArticleComment
} from './store/article-page.actions';
import {
    selectArticlePageArticle,
    selectArticlePageAuthor,
    selectArticlePageTags,
    selectFullArticlePageComments
} from './store/article-page.selectors';
import { selectCurrentUser } from '../../../store/auth/auth.selectors';
import { selectReactionsByArticleId } from '../../../store/article-reaction/article-reactions.selectors';
import { ArticleComment } from '../../../store/article-comment/article-comment.model';
import { toggleArticleFav, toggleArticleLike } from '../../../store/article-reaction/article-reaction.actions';
import { ArticleReactions } from '../../../store/article-reaction/article-reactions.model';


@Component({
    selector: 'article-page',
    templateUrl: './article-page.component.html',
    styleUrls: ['./article-page.component.scss']
})
export class ArticlePageComponent implements OnInit, OnDestroy {

    article$: Observable<Article>;
    articleSubscription: SubscriptionLike = Subscription.EMPTY;
    articleId: string;
    article: Article;

    articleAuthor$: Observable<User>;
    articleTags$: Observable<ArticleTag[]>;
    articleComments$: Observable<ArticleComment[]>;
    currentUser$: Observable<User>;

    reactionsSubscription: SubscriptionLike = Subscription.EMPTY;
    likesCount = 0;
    liked = false;
    favsCount = 0;
    favorite = false;

    constructor(private title: Title,
                private store: Store<State>,
                private activatedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
            const articleId = paramMap.get('articleId');

            this.articleId = articleId;
            this.store.dispatch(loadArticle({articleId}));
            this.store.dispatch(loadArticleComments({articleId}));
        });

        this.article$ = this.store.pipe(
            select(selectArticlePageArticle),
            filter((article: Article) => !!article)
        );

        this.articleSubscription = this.article$.subscribe((article: Article) => {
            this.article = article;
            this.title.setTitle(article.title);
        });

        this.articleAuthor$ = this.store.pipe(select(selectArticlePageAuthor));
        this.articleTags$ = this.store.pipe(select(selectArticlePageTags));

        this.articleComments$ = this.store.pipe(select(selectFullArticlePageComments));
        this.currentUser$ = this.store.pipe(select(selectCurrentUser));

        this.reactionsSubscription = this.article$.pipe(
            switchMap((article: Article) => {
                return this.store.pipe(
                    select(selectReactionsByArticleId, {articleId: article.id}),
                    filter((articleReactions: ArticleReactions) => !!articleReactions),
                    withLatestFrom(this.store.pipe(select(selectCurrentUser)).pipe(map((currentUser: User) => currentUser.id)))
                );
            })
        ).subscribe(([articleReactions, currentUserId]: [ArticleReactions, string]) => {
            const {reactionsCounts, reactionsAuthors} = articleReactions;

            if (reactionsCounts) {
                this.likesCount = reactionsCounts.likes;
                this.favsCount = reactionsCounts.stars;
            }

            if (reactionsAuthors) {
                this.liked = reactionsAuthors.likes.includes(currentUserId);
                this.favorite = reactionsAuthors.stars.includes(currentUserId);
            }
        });
    }

    ngOnDestroy(): void {
        this.articleSubscription.unsubscribe();
        this.reactionsSubscription.unsubscribe();
    }

    updateReactions(article: Article, currentUser: User) {
        const {reactionsCounts, reactionsAuthors} = article;

        if (reactionsCounts) {
            this.likesCount = reactionsCounts.likes;
            this.favsCount = reactionsCounts.stars;
        }

        if (reactionsAuthors && currentUser) {
            const currentUserId = currentUser.id;

            this.liked = reactionsAuthors.likes.includes(currentUserId);
            this.favorite = reactionsAuthors.stars.includes(currentUserId);
        }
    }

    toggleLike(): void {
        this.store.dispatch(toggleArticleLike({articleId: this.article.id}));
    }

    toggleFav(): void {
        this.store.dispatch(toggleArticleFav({articleId: this.article.id}));
    }

    deleteArticle(event: MouseEvent): void {
        event.stopPropagation();
        this.store.dispatch(deleteArticle({articleId: this.articleId}));
    }

    createComment(event: { text: string }): void {
        this.store.dispatch(createArticleComment({articleId: this.article.id, formValue: event}));
    }

    updateComment({id, text}: { id: string; text: string }): void {
        this.store.dispatch(updateArticleComment({articleId: this.article.id, commentId: id, formValue: {text}}));
    }

    deleteComment({id}: { id: string }): void {
        this.store.dispatch(deleteArticleComment({articleId: this.article.id, commentId: id}));
    }
}
