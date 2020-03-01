import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, exhaustMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';

import { select, Store } from '@ngrx/store';
import { State } from '../../../../store';

import * as ArticlesFeedActions from './articles-feed.actions';

import { ArticlesService } from '../../../../services/articles.service';
import { Article, ArticleParams } from '../../../../store/article/article.model';
import * as ArticlesActions from '../../../../store/article/article.actions';

import { UsersService } from '../../../../services/users.service';
import { User } from '../../../../store/user/user.model';
import * as UsersActions from '../../../../store/user/user.actions';

import { ArticleTag } from '../../../../store/article-tag/article-tag.model';
import { ArticleTagsService } from '../../../../services/article-tags.service';
import * as ArticleTagsActions from '../../../../store/article-tag/article-tag.actions';

import * as ArticleReactionsActions from '../../../../store/article-reaction/article-reaction.actions';

import { selectArticlesFeedQueryParams } from './articles-feed.selectors';
import { getArticlesReactions } from '../../../../store/article-reaction/article-reaction-helpers';

@Injectable()
export class ArticlesFeedEffects {

    loadArticles$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ArticlesFeedActions.loadArticles),
            concatMap(({queryParams}: { queryParams: ArticleParams }) =>
                this.articlesService.getArticles(queryParams).pipe(
                    switchMap((response: {total: number, offset: number, page: number, posts: Article[]}) => {
                        const articlesReactions = getArticlesReactions(response.posts);

                        return [
                            ArticlesActions.loadArticles({articles: response.posts}),
                            ArticleReactionsActions.loadArticlesReactions({articlesReactions}),
                            ArticlesFeedActions.saveArticlesFeedQueryParams({queryParams}),
                            ArticlesFeedActions.loadArticlesSuccess({response})
                        ];
                    }),
                    catchError(error => of(ArticlesFeedActions.loadArticlesFailure({error}))))
            )
        );
    });

    loadNextArticlesBatch$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ArticlesFeedActions.loadNextArticlesBatch),
            withLatestFrom(this.store.pipe(select(selectArticlesFeedQueryParams))),
            concatMap(([action, lastQueryParams]) => {
                const queryParams = {...lastQueryParams, page: lastQueryParams.page + 1};

                return this.articlesService.getArticles(queryParams).pipe(
                    switchMap((response: {total: number, offset: number, page: number, posts: Article[]}) => {
                        const articlesReactions = getArticlesReactions(response.posts);

                        return [
                            ArticlesActions.upsertArticles({articles: response.posts}),
                            ArticleReactionsActions.addArticlesReactions({articlesReactions}),
                            ArticlesFeedActions.saveArticlesFeedQueryParams({queryParams}),
                            ArticlesFeedActions.loadNextArticlesBatchSuccess({response})
                        ];
                    }),
                    catchError(error => of(ArticlesFeedActions.loadNextArticlesBatchFailure({error}))));
            })
        );
    });

    loadArticlesAuthors$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ArticlesFeedActions.loadArticlesAuthors),
            exhaustMap(() =>
                this.usersService.getAllUsers().pipe(
                    switchMap((articlesAuthors: User[]) => [
                        UsersActions.upsertUsers({users: articlesAuthors}),
                        ArticlesFeedActions.loadArticlesAuthorsSuccess({articlesAuthors})
                    ]),
                    catchError(error => of(ArticlesFeedActions.loadArticlesAuthorsFailure({error}))))
            )
        );
    });

    loadArticlesTags$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ArticlesFeedActions.loadArticlesTags),
            exhaustMap(() =>
                this.articleTagsService.getAllTags().pipe(
                    switchMap((articleTags: ArticleTag[]) => [
                        ArticleTagsActions.upsertArticleTags({articleTags}),
                        ArticlesFeedActions.loadArticlesTagsSuccess({articleTags})
                    ]),
                    catchError(error => of(ArticlesFeedActions.loadArticlesTagsFailure({error}))))
            )
        );
    });

    constructor(private actions$: Actions,
                private store: Store<State>,
                private articlesService: ArticlesService,
                private articleTagsService: ArticleTagsService,
                private usersService: UsersService) {
    }
}
