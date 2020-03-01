import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { uniq } from 'lodash';

import * as ArticlePageActions from './article-page.actions';

import { ArticlesService } from '../../../../services/articles.service';
import { Article } from '../../../../store/article/article.model';
import * as ArticlesActions from '../../../../store/article/article.actions';

import { ArticleCommentsService } from '../../../../services/article-comments.service';
import * as ArticleCommentsActions from '../../../../store/article-comment/article-comment.actions';
import { ArticleComment } from '../../../../store/article-comment/article-comment.model';

import { ArticleTagsService } from '../../../../services/article-tags.service';
import { ArticleTag } from '../../../../store/article-tag/article-tag.model';
import * as ArticleTagsActions from '../../../../store/article-tag/article-tag.actions';

import { UsersService } from '../../../../services/users.service';
import { User } from '../../../../store/user/user.model';
import * as UsersActions from '../../../../store/user/user.actions';
import * as ArticleReactionsActions from '../../../../store/article-reaction/article-reaction.actions';
import { getArticleReactions } from '../../../../store/article-reaction/article-reaction-helpers';


@Injectable()
export class ArticlePageEffects {

    loadArticle$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ArticlePageActions.loadArticle),
            exhaustMap(({articleId}) =>
                this.articlesService.getArticleById(articleId).pipe(
                    switchMap((article: Article) => {
                        const articleReactions = getArticleReactions(article);

                        return [
                            ArticlesActions.upsertArticle({article}),
                            ArticleReactionsActions.addArticleReactions({articleReactions}),
                            ArticlePageActions.loadArticleSuccess({article})
                        ];
                    }),
                    catchError(error => of(ArticlePageActions.loadArticleFailure({error}))))
            )
        );
    });

    loadArticleSuccess$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ArticlePageActions.loadArticleSuccess),
            switchMap(({article}) => [
                ArticlePageActions.loadArticleAuthor({articleAuthorId: article.author}),
                ArticlePageActions.loadArticleTags({tagIds: article.tags})
            ]));
    });

    loadArticleAuthor$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ArticlePageActions.loadArticleAuthor),
            exhaustMap(({articleAuthorId}) =>
                this.usersService.getUserById(articleAuthorId).pipe(
                    switchMap((articleAuthor: User) => [
                        UsersActions.upsertUser({user: articleAuthor}),
                        ArticlePageActions.loadArticleAuthorSuccess({articleAuthor})
                    ]),
                    catchError(error => of(ArticlePageActions.loadArticleAuthorFailure({error}))))
            )
        );
    });

    loadArticleTags$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ArticlePageActions.loadArticleTags),
            exhaustMap(({tagIds}) =>
                this.articleTagsService.getAllTags().pipe(
                    switchMap((articleTags: ArticleTag[]) => [
                        ArticleTagsActions.upsertArticleTags({articleTags}),
                        ArticlePageActions.loadArticleTagsSuccess({articleTags})
                    ]),
                    catchError(error => of(ArticlePageActions.loadArticleTagsFailure({error}))))
            )
        );
    });

    loadArticleComments$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ArticlePageActions.loadArticleComments),
            exhaustMap(({articleId}) =>
                this.articleCommentsService.getComments(articleId).pipe(
                    switchMap((articleComments: ArticleComment[]) => [
                        ArticleCommentsActions.loadArticleComments({articleComments}),
                        ArticlePageActions.loadArticleCommentsSuccess({articleComments})
                    ]),
                    catchError(error => of(ArticlePageActions.loadArticleCommentsFailure({error}))))
            )
        );
    });

    loadArticleCommentsSuccess$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ArticlePageActions.loadArticleCommentsSuccess),
            map(({articleComments}) => {
                return ArticlePageActions.loadArticleCommentsAuthors({
                    userIds: uniq(articleComments.map((comment) => comment._author))
                });
            })
        );
    });

    loadArticleCommentsAuthors$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ArticlePageActions.loadArticleCommentsAuthors),
            exhaustMap(({userIds}) =>
                this.usersService.getAllUsers().pipe(
                    switchMap((users: User[]) => [
                        UsersActions.upsertUsers({users}),
                        ArticlePageActions.loadArticleCommentsAuthorsSuccess({users})
                    ]),
                    catchError(error => of(ArticlePageActions.loadArticleCommentsFailure({error}))))
            )
        );
    });

    createComment$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ArticlePageActions.createArticleComment),
            exhaustMap(({articleId, formValue}) =>
                this.articleCommentsService.createComment(articleId, formValue).pipe(
                    switchMap((articleComment: ArticleComment) => [
                        ArticleCommentsActions.addArticleComment({articleComment}),
                        ArticlePageActions.createArticleCommentSuccess({articleComment})
                    ]),
                    catchError(error => of(ArticlePageActions.createArticleCommentFailure({error}))))
            )
        );
    });

    updateComment$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ArticlePageActions.updateArticleComment),
            exhaustMap(({articleId, commentId, formValue}) =>
                this.articleCommentsService.updateComment(articleId, commentId, formValue).pipe(
                    switchMap((articleComment: ArticleComment) => [
                        ArticleCommentsActions.updateArticleComment({articleComment: {id: articleComment._id, changes: articleComment}}),
                        ArticlePageActions.updateArticleCommentSuccess({articleComment})
                    ]),
                    catchError(error => of(ArticlePageActions.updateArticleCommentFailure({error}))))
            )
        );
    });

    deleteComment$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ArticlePageActions.deleteArticleComment),
            exhaustMap(({articleId, commentId}) =>
                this.articleCommentsService.deleteComment(articleId, commentId).pipe(
                    switchMap(() => [
                        ArticleCommentsActions.deleteArticleComment({id: commentId}),
                        ArticlePageActions.deleteArticleCommentSuccess({commentId})
                    ]),
                    catchError(error => of(ArticlePageActions.deleteArticleCommentFailure({error}))))
            )
        );
    });

    deleteArticle$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ArticlePageActions.deleteArticle),
            exhaustMap(({articleId}: { articleId: string }) =>
                this.articlesService.deleteArticle(articleId).pipe(
                    switchMap((message: any) => [
                        ArticlesActions.deleteArticle({id: articleId}),
                        ArticlePageActions.deleteArticleSuccess({articleId})
                    ]),
                    catchError(error => of(ArticlePageActions.deleteArticleFailure({error}))))
            )
        );
    });

    deleteArticleSuccess$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ArticlePageActions.deleteArticleSuccess),
            map(() => {
                const navigationState: { navigationId?: number } = this.location.getState();

                if (navigationState.navigationId) {
                    this.location.back();
                } else {
                    this.router.navigate(['/app/articles']);
                }
            })
        );
    }, {dispatch: false});

    constructor(private actions$: Actions,
                private router: Router,
                private location: Location,
                private articlesService: ArticlesService,
                private articleTagsService: ArticleTagsService,
                private articleCommentsService: ArticleCommentsService,
                private usersService: UsersService) {
    }
}
