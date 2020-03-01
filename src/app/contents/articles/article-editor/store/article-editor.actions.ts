import { createAction, props } from '@ngrx/store';
import { Article, ArticleFormValue } from '../../../../store/article/article.model';
import { ArticleTag } from '../../../../store/article-tag/article-tag.model';

export const loadArticle = createAction(
    '[Article Editor] Load Edited Article',
    props<{ articleId: string }>()
);

export const loadArticleSuccess = createAction(
    '[Article Editor] Load Edited Article Success',
    props<{ article: Article }>()
);

export const loadArticleFailure = createAction(
    '[Article Editor] Load Edited Article Failure',
    props<{ error: any }>()
);

export const createArticle = createAction(
    '[Article Editor] Create Article',
    props<{ formValue: ArticleFormValue }>()
);

export const createArticleSuccess = createAction(
    '[Article Editor] Successfully Created New Article',
    props<{ article: Article }>()
);

export const createArticleFailure = createAction(
    '[Article Editor] Failed To Create New Article',
    props<{ error: any }>()
);

export const editArticle = createAction(
    '[Article Editor] Edit Existing Article',
    props<{ articleId: string, formValue: ArticleFormValue }>()
);

export const editArticleSuccess = createAction(
    '[Article Editor] Successfully Edited Existing Article',
    props<{ article: Article }>()
);

export const editArticleFailure = createAction(
    '[Article Editor] Failed To Edit Existing Article',
    props<{ error: any }>()
);

export const loadAllTags = createAction(
    '[Article Editor] Load All Available Tags'
);

export const loadAllTagsSuccess = createAction(
    '[Article Editor] Successfully Loaded All Available Tags',
    props<{ articleTags: ArticleTag[] }>()
);

export const loadAllTagsFailure = createAction(
    '[Article Editor] Failed To Load All Available Tags',
    props<{ error: any }>()
);

export const createTag = createAction(
    '[Article Editor] Create New Tag',
    props<{ name: string }>()
);

export const createTagSuccess = createAction(
    '[Article Editor] Successfully Created New Tag',
    props<{ articleTag: ArticleTag }>()
);

export const createTagFailure = createAction(
    '[Article Editor] Failed To Create New Tag',
    props<{ error: any }>()
);

export const deleteTag = createAction(
    '[Article Editor] Delete Tag',
    props<{ articleTagId: number }>()
);

export const deleteTagSuccess = createAction(
    '[Article Editor] Successfully Deleted Tag',
    props<{ articleTagId: number }>()
);

export const deleteTagFailure = createAction(
    '[Article Editor] Failed To Create New Tag',
    props<{ error: any }>()
);
