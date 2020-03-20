import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromArticleTag from './article-tag.reducer';

export const getArticleTagsState = createFeatureSelector<fromArticleTag.State>(fromArticleTag.articleTagsFeatureKey);

export const selectArticleTagsEntities = createSelector(getArticleTagsState, fromArticleTag.selectEntities);
export const selectAllArticleTags = createSelector(getArticleTagsState, fromArticleTag.selectAll);
