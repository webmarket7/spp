import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromArticle from './article.reducer';
import { Dictionary } from '@ngrx/entity';
import { Article } from './article.model';

export const getArticleState = createFeatureSelector<fromArticle.State>(fromArticle.articlesFeatureKey);

export const selectArticleEntities = createSelector(getArticleState, fromArticle.selectEntities);

export const selectArticleById = createSelector(
    selectArticleEntities,
    (articlesDictionary: Dictionary<Article>, { articleId }) => articleId && articlesDictionary
        ? articlesDictionary[articleId]
        : null
);
