import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromArticleReactions from './article-reaction.reducer';
import { ArticleReactions } from './article-reactions.model';
import { Dictionary } from '@ngrx/entity';

export const getArticleReactionsState = createFeatureSelector<fromArticleReactions.State>(fromArticleReactions.articleReactionsFeatureKey);

export const selectArticlesReactionsEntities = createSelector(getArticleReactionsState, fromArticleReactions.selectEntities);

export const selectReactionsByArticleId = createSelector(
    selectArticlesReactionsEntities,
    (reactionsDictionary: Dictionary<ArticleReactions>, {articleId}) => {
        return reactionsDictionary && articleId ? reactionsDictionary[articleId] : null;
    });
