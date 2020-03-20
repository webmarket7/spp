import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromArticleComment from './article-comment.reducer';

export const getArticleCommentState = createFeatureSelector<fromArticleComment.State>(fromArticleComment.articleCommentsFeatureKey);

export const selectArticleCommentEntities = createSelector(getArticleCommentState, fromArticleComment.selectEntities);
