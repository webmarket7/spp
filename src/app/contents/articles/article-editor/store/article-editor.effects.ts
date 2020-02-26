import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { catchError, exhaustMap, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as ArticleEditorActions from './article-editor.actions';

import { ArticlesService } from '../../../../services/articles.service';
import * as ArticlesActions from '../../../../store/article/article.actions';
import { Article } from '../../../../store/article/article.model';

import { ArticleTagsService } from '../../../../services/article-tags.service';
import * as ArticleTagsActions from '../../../../store/article-tag/article-tag.actions';
import { ArticleTag } from '../../../../store/article-tag/article-tag.model';
import { MediaService } from '../../../../services/media.service';


@Injectable()
export class ArticleEditorEffects {

    loadArticle$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ArticleEditorActions.loadArticle),
            exhaustMap(({articleId}: { articleId: string }) =>
                this.articlesService.getArticleById(articleId).pipe(
                    switchMap((article: Article) => [
                        ArticlesActions.upsertArticle({article}),
                        ArticleEditorActions.loadArticleSuccess({article})
                    ]),
                    catchError(error => of(ArticleEditorActions.loadArticleFailure({error}))))
            )
        );
    });

    loadAllTags$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ArticleEditorActions.loadAllTags),
            exhaustMap(() =>
                this.articleTagsService.getAllTags().pipe(
                    switchMap((articleTags: ArticleTag[]) => {
                        return [
                            ArticleTagsActions.upsertArticleTags({articleTags}),
                            ArticleEditorActions.loadAllTagsSuccess({articleTags})
                        ];
                    }),
                    catchError(error => of(ArticleEditorActions.loadAllTagsFailure({error}))))
            )
        );
    });

    createArticle$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ArticleEditorActions.createArticle),
            exhaustMap(({ formValue }) => {
                return this.mediaService.uploadImage(formValue.image).pipe(
                    switchMap((image: string) => {
                        return this.articlesService.createArticle({...formValue, image}).pipe(
                            switchMap((article: Article) => {
                                return [
                                    ArticlesActions.addArticle({article}),
                                    ArticleEditorActions.createArticleSuccess({article})
                                ];
                            }),
                            catchError(error => of(ArticleEditorActions.createArticleFailure({error}))))
                    }),
                );
            })
        );
    });

    createArticleSuccess$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ArticleEditorActions.createArticleSuccess),
            map(({ article }) => {
                this.router.navigate(['/app/articles/article', article.id]);
            })
        );
    }, { dispatch: false });

    editArticle$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ArticleEditorActions.editArticle),
            exhaustMap(({ articleId, formValue }) => {
                return this.mediaService.uploadImage(formValue.image).pipe(
                    switchMap((image: string) => {
                        return this.articlesService.updateArticle(articleId, {...formValue, image}).pipe(
                            switchMap((article: Article) => {
                                return [
                                    ArticlesActions.updateArticle({article: {id: articleId, changes: article}}),
                                    ArticleEditorActions.editArticleSuccess({article})
                                ];
                            }),
                            catchError(error => of(ArticleEditorActions.editArticleFailure({error}))))
                    })
                );
            })
        );
    });

    editArticleSuccess$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ArticleEditorActions.editArticleSuccess),
            map(({ article }) => {
                this.router.navigate(['/app/articles/article', article.id]);
            })
        );
    }, { dispatch: false });

    createTag$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ArticleEditorActions.createTag),
            exhaustMap(({ name }) =>
                this.articleTagsService.createTag(name).pipe(
                    switchMap((articleTag: ArticleTag) => {
                        return [
                            ArticleTagsActions.addArticleTag({articleTag}),
                            ArticleEditorActions.createTagSuccess({articleTag})
                        ];
                    }),
                    catchError(error => of(ArticleEditorActions.createTagFailure({error}))))
            )
        );
    });

    deleteTag$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ArticleEditorActions.deleteTag),
            exhaustMap(({ articleTagId }) =>
                this.articleTagsService.deleteTagById(articleTagId).pipe(
                    switchMap(() => {
                        return [
                            ArticleTagsActions.deleteArticleTag({id: articleTagId}),
                            ArticleEditorActions.deleteTagSuccess({articleTagId})
                        ];
                    }),
                    catchError(error => of(ArticleEditorActions.loadAllTagsFailure({error}))))
            )
        );
    });

    constructor(
        private actions$: Actions,
        private router: Router,
        private articlesService: ArticlesService,
        private articleTagsService: ArticleTagsService,
        private mediaService: MediaService
    ) {
    }
}
