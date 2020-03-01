import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { ArticleTag } from './article-tag.model';

export const loadArticleTags = createAction(
    '[Article Tag/API] Load Article Tags',
    props<{ articleTags: ArticleTag[] }>()
);

export const addArticleTag = createAction(
    '[Article Tag/API] Add Article Tag',
    props<{ articleTag: ArticleTag }>()
);

export const upsertArticleTag = createAction(
    '[Article Tag/API] Upsert Article Tag',
    props<{ articleTag: ArticleTag }>()
);

export const addArticleTags = createAction(
    '[Article Tag/API] Add Article Tags',
    props<{ articleTags: ArticleTag[] }>()
);

export const upsertArticleTags = createAction(
    '[Article Tag/API] Upsert Article Tags',
    props<{ articleTags: ArticleTag[] }>()
);

export const updateArticleTag = createAction(
    '[Article Tag/API] Update Article Tag',
    props<{ articleTag: Update<ArticleTag> }>()
);

export const updateArticleTags = createAction(
    '[Article Tag/API] Update Article Tags',
    props<{ articleTags: Update<ArticleTag>[] }>()
);

export const deleteArticleTag = createAction(
    '[Article Tag/API] Delete Article Tag',
    props<{ id: number }>()
);

export const deleteArticleTags = createAction(
    '[Article Tag/API] Delete Article Tags',
    props<{ ids: number[] }>()
);

export const clearArticleTags = createAction(
    '[Article Tag/API] Clear Article Tags'
);
