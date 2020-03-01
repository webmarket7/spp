import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectEntitiesByIds, selectEntityById } from '../../../../store/common/selectors-helpers';

import * as fromArticlePage from './article-page.reducer';
import * as fromArticle from '../../../../store/article/article.selectors';
import * as fromArticleComment from '../../../../store/article-comment/article-comment.selectors';
import * as fromUser from '../../../../store/user/user.selectors';

import { selectUserEntities } from '../../../../store/user/user.selectors';
import { selectArticleTagsEntities } from '../../../../store/article-tag/article-tag.selectors';
import { Dictionary } from '@ngrx/entity';
import { ArticleComment } from '../../../../store/article-comment/article-comment.model';
import { User } from '../../../../store/user/user.model';


export const selectArticlePageState = createFeatureSelector<fromArticlePage.State>(
    fromArticlePage.articlePageFeatureKey
);

export const selectArticlePageArticleId = createSelector(
    selectArticlePageState,
    (state) => state.articleId
);

export const selectArticlePageArticle = createSelector(
    selectArticlePageArticleId,
    fromArticle.selectArticleEntities,
    selectEntityById
);

export const selectArticlePageAuthorId = createSelector(
    selectArticlePageArticle,
    (article) => article ? article.author : null
);

export const selectArticlePageAuthor = createSelector(
    selectArticlePageAuthorId,
    selectUserEntities,
    selectEntityById
);

export const selectArticlePageTagIds = createSelector(
    selectArticlePageArticle,
    (article) => article ? article.tags : []
);

export const selectArticlePageTags = createSelector(
    selectArticlePageTagIds,
    selectArticleTagsEntities,
    selectEntitiesByIds
);

export const selectArticlePageCommentIds = createSelector(
    selectArticlePageState,
    (state) => state.articleCommentIds
);

export const selectArticlePageComments = createSelector(
    selectArticlePageCommentIds,
    fromArticleComment.selectArticleCommentEntities,
    selectEntitiesByIds
);

export const selectFullArticlePageComments = createSelector(
    selectArticlePageComments,
    fromUser.selectUserEntities,
    (comments: ArticleComment[], usersDictionary: Dictionary<User>) => {
        return usersDictionary
            ? comments.map((comment: ArticleComment) => ({...comment, author: usersDictionary[comment._author]}))
            : comments;
    }
);
