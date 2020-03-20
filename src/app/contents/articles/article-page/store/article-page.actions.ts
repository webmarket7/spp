import { createAction, props } from '@ngrx/store';
import { Article } from '../../../../store/article/article.model';
import { ArticleComment } from '../../../../store/article-comment/article-comment.model';
import { ArticleTag } from '../../../../store/article-tag/article-tag.model';
import { User } from '../../../../store/user/user.model';

export const loadArticle = createAction(
    '[Article Page] Load Article',
    props<{ articleId: string }>()
);

export const loadArticleSuccess = createAction(
    '[Article Page] Load Article Success',
    props<{ article: Article }>()
);

export const loadArticleFailure = createAction(
    '[Article Page] Load Article Failure',
    props<{ error: any }>()
);

export const loadArticleAuthor = createAction(
    '[Article Page] Load Article Author',
    props<{ articleAuthorId: string }>()
);

export const loadArticleAuthorSuccess = createAction(
    '[Article Page] Load Article Author Success',
    props<{ articleAuthor: User }>()
);

export const loadArticleAuthorFailure = createAction(
    '[Article Page] Load Article Author Failure',
    props<{ error: any }>()
);

export const loadArticleTags = createAction(
    '[Article Page] Load Article Tags',
    props<{ tagIds: number[] }>()
);

export const loadArticleTagsSuccess = createAction(
    '[Article Page] Load Article Tags Success',
    props<{ articleTags: ArticleTag[] }>()
);

export const loadArticleTagsFailure = createAction(
    '[Article Page] Load Article Tags Failure',
    props<{ error: any }>()
);

export const loadArticleComments = createAction(
    '[Article Page] Load Article Comments',
    props<{ articleId: string }>()
);

export const loadArticleCommentsSuccess = createAction(
    '[Article Page] Load Article Comments Success',
    props<{ articleComments: ArticleComment[] }>()
);

export const loadArticleCommentsFailure = createAction(
    '[Article Page] Load Article Comments Failure',
    props<{ error: any }>()
);

export const loadArticleCommentsAuthors = createAction(
    '[Article Page] Load Article Comments Authors',
    props<{ userIds: string[] }>()
);

export const loadArticleCommentsAuthorsSuccess = createAction(
    '[Article Page] Load Article Comments Authors Success',
    props<{ users: User[] }>()
);

export const loadArticleCommentsAuthorsFailure = createAction(
    '[Article Page] Load Article Comments Authors Failure',
    props<{ error: any }>()
);

export const createArticleComment = createAction(
    '[Article Page] Create Article Comment',
    props<{ articleId: string, formValue: Partial<ArticleComment> }>()
);

export const createArticleCommentSuccess = createAction(
    '[Article Page] Create Article Comment Success',
    props<{ articleComment: ArticleComment }>()
);

export const createArticleCommentFailure = createAction(
    '[Article Page] Create Article Comment Failure',
    props<{ error: any }>()
);

export const updateArticleComment = createAction(
    '[Article Page] Update Article Comment',
    props<{ articleId: string, commentId: string, formValue: Partial<ArticleComment> }>()
);

export const updateArticleCommentSuccess = createAction(
    '[Article Page] Update Article Comment Success',
    props<{ articleComment: ArticleComment }>()
);

export const updateArticleCommentFailure = createAction(
    '[Article Page] Update Article Comment Failure',
    props<{ error: any }>()
);

export const deleteArticleComment = createAction(
    '[Article Page] Delete Article Comment',
    props<{ articleId: string, commentId: string }>()
);

export const deleteArticleCommentSuccess = createAction(
    '[Article Page] Delete Article Comment Success',
    props<{ commentId: string }>()
);

export const deleteArticleCommentFailure = createAction(
    '[Article Page] Delete Article Comment Failure',
    props<{ error: any }>()
);

export const deleteArticle = createAction(
    '[Article Page] Delete Article',
    props<{ articleId: string }>()
);

export const deleteArticleSuccess = createAction(
    '[Article Page] Delete Article Success',
    props<{ articleId: string }>()
);

export const deleteArticleFailure = createAction(
    '[Article Page] Delete Article Failure',
    props<{ error: any }>()
);
