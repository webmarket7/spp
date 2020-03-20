import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { ArticleReactions } from './article-reactions.model';

export const loadArticlesReactions = createAction(
    '[Article Reaction/API] Load Articles Reactions',
    props<{ articlesReactions: ArticleReactions[] }>()
);

export const addArticleReactions = createAction(
    '[Article Reaction/API] Add Article Reactions',
    props<{ articleReactions: ArticleReactions }>()
);

export const upsertArticleReactions = createAction(
    '[Article Reaction/API] Upsert Article Reactions',
    props<{ articleReactions: ArticleReactions }>()
);

export const addArticlesReactions = createAction(
    '[Article Reaction/API] Add Articles Reactions',
    props<{ articlesReactions: ArticleReactions[] }>()
);

export const upsertArticlesReactions = createAction(
    '[Article Reaction/API] Upsert Articles Reactions',
    props<{ articlesReactions: ArticleReactions[] }>()
);

export const updateArticleReactions = createAction(
    '[Article Reaction/API] Update Article Reactions',
    props<{ articleReactions: Update<ArticleReactions> }>()
);

export const updateArticlesReactions = createAction(
    '[Article Reaction/API] Update Articles Reactions',
    props<{ articlesReactions: Update<ArticleReactions>[] }>()
);

export const deleteArticleReactions = createAction(
    '[Article Reaction/API] Delete Article Reactions',
    props<{ id: string }>()
);

export const deleteArticlesReactions = createAction(
    '[Article Reaction/API] Delete Articles Reactions',
    props<{ ids: string[] }>()
);

export const clearArticlesReactions = createAction(
    '[Article Reaction/API] Clear Articles Reactions'
);

export const toggleArticleLike = createAction(
    '[Article Reaction/API] Toggle Article Like',
    props<{ articleId: string }>()
);

export const toggleArticleLikeSuccess = createAction(
    '[Article Reaction/API] Successfully Toggled Article Like',
    props<{ articleReactions: ArticleReactions }>()
);

export const toggleArticleLikeFailure = createAction(
    '[Article Reaction/API] Failed To Toggle Article Like',
    props<{ error: any }>()
);

export const toggleArticleFav = createAction(
    '[Article Reaction/API] Toggle Article Fav',
    props<{ articleId: string }>()
);

export const toggleArticleFavSuccess = createAction(
    '[Article Reaction/API] Successfully Toggled Article Fav',
    props<{ articleReactions: ArticleReactions }>()
);

export const toggleArticleFavFailure = createAction(
    '[Article Reaction/API] Failed To Toggle Article Fav',
    props<{ error: any }>()
);
