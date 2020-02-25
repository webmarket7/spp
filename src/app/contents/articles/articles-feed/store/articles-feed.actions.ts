import { createAction, props } from '@ngrx/store';
import { Article, ArticleParams } from '../../../../store/article/article.model';
import { ArticleTag } from '../../../../store/article-tag/article-tag.model';
import { User } from '../../../../store/user/user.model';

export const saveArticlesFeedQueryParams = createAction(
    '[Articles Feed] Save Latest Query Params',
    props<{ queryParams: ArticleParams }>()
);

export const loadArticles = createAction(
    '[Articles Feed] Load Articles',
    props<{ queryParams: ArticleParams }>()
);

export const loadArticlesSuccess = createAction(
    '[Articles Feed] Load Articles Success',
    props<{ articles: Article[] }>()
);

export const loadArticlesFailure = createAction(
    '[Articles Feed] Load Articles Feed Failure',
    props<{ error: any }>()
);

export const loadNextArticlesBatch = createAction(
    '[Articles Feed] Load Next Articles Batch',
);

export const loadNextArticlesBatchSuccess = createAction(
    '[Articles Feed] Next Articles Batch Successfully Loaded',
    props<{ articles: Article[] }>()
);

export const loadNextArticlesBatchFailure = createAction(
    '[Articles Feed] Failed To Load Next Articles Batch',
    props<{ error: any }>()
);

export const loadArticlesAuthors = createAction(
    '[Articles Feed] Load Articles Authors'
);

export const loadArticlesAuthorsSuccess = createAction(
    '[Articles Feed] Load Articles Authors Success',
    props<{ articlesAuthors: User[] }>()
);

export const loadArticlesAuthorsFailure = createAction(
    '[Articles Feed] Load Articles Authors Failure',
    props<{ error: any }>()
);

export const loadArticlesTags = createAction(
    '[Articles Feed] Load Articles Tags'
);

export const loadArticlesTagsSuccess = createAction(
    '[Articles Feed] Load Articles Tags Success',
    props<{ articleTags: ArticleTag[] }>()
);

export const loadArticlesTagsFailure = createAction(
    '[Articles Feed] Load Articles Tags Failure',
    props<{ error: any }>()
);

