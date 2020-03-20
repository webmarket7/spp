import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { ArticleReactionsService } from '../../services/article-reactions.service';
import { ArticleReactions } from './article-reactions.model';
import * as ArticleReactionActions from './article-reaction.actions';


@Injectable()
export class ArticleReactionEffects {

    toggleLike$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ArticleReactionActions.toggleArticleLike),
            exhaustMap(({articleId}) => {
                return this.articleReactionsService.toggleReaction('likes', articleId)
                    .pipe(
                        map((articleReactions: ArticleReactions) => ArticleReactionActions.toggleArticleLikeSuccess({articleReactions})),
                        catchError((error) => of(ArticleReactionActions.toggleArticleLikeFailure({error})))
                    );
            })
        );
    });

    toggleLikeSuccess$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ArticleReactionActions.toggleArticleLikeSuccess),
            map(({articleReactions}) => {
                return ArticleReactionActions.updateArticleReactions({
                    articleReactions: {
                        id: articleReactions.postId,
                        changes: articleReactions
                    }
                });
            })
        );
    });

    toggleFav$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ArticleReactionActions.toggleArticleFav),
            exhaustMap(({articleId}) => {
                return this.articleReactionsService.toggleReaction('stars', articleId)
                    .pipe(
                        map((articleReactions: ArticleReactions) => ArticleReactionActions.toggleArticleFavSuccess({articleReactions})),
                        catchError((error) => of(ArticleReactionActions.toggleArticleFavFailure({error})))
                    );
            })
        );
    });

    toggleFavSuccess$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ArticleReactionActions.toggleArticleFavSuccess),
            map(({articleReactions}) => {
                return ArticleReactionActions.updateArticleReactions({
                    articleReactions: {
                        id: articleReactions.postId,
                        changes: articleReactions
                    }
                });
            })
        );
    });

    constructor(
        private actions$: Actions,
        private articleReactionsService: ArticleReactionsService
    ) {
    }
}
