import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { ArticleComment } from './article-comment.model';

export const loadArticleComments = createAction(
    '[Article Comment/API] Load Article Comments',
    props<{ articleComments: ArticleComment[] }>()
);

export const addArticleComment = createAction(
    '[Article Comment/API] Add Article Comment',
    props<{ articleComment: ArticleComment }>()
);

export const upsertArticleComment = createAction(
    '[Article Comment/API] Upsert Article Comment',
    props<{ articleComment: ArticleComment }>()
);

export const addArticleComments = createAction(
    '[Article Comment/API] Add Article Comments',
    props<{ articleComments: ArticleComment[] }>()
);

export const upsertArticleComments = createAction(
    '[Article Comment/API] Upsert Article Comments',
    props<{ articleComments: ArticleComment[] }>()
);

export const updateArticleComment = createAction(
    '[Article Comment/API] Update Article Comment',
    props<{ articleComment: Update<ArticleComment> }>()
);

export const updateArticleComments = createAction(
    '[Article Comment/API] Update Article Comments',
    props<{ articleComments: Update<ArticleComment>[] }>()
);

export const deleteArticleComment = createAction(
    '[Article Comment/API] Delete Article Comment',
    props<{ id: string }>()
);

export const deleteArticleComments = createAction(
    '[Article Comment/API] Delete Article Comments',
    props<{ ids: string[] }>()
);

export const clearArticleComments = createAction(
    '[Article Comment/API] Clear Article Comments'
);
