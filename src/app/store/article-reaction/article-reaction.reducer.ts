import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { ArticleReactions } from './article-reactions.model';
import * as ArticleReactionActions from './article-reaction.actions';

export const articleReactionsFeatureKey = 'articleReactions';

export interface State extends EntityState<ArticleReactions> {
}

export const adapter: EntityAdapter<ArticleReactions> = createEntityAdapter<ArticleReactions>({
    selectId: (articleReactions) => articleReactions.postId
});

export const initialState: State = adapter.getInitialState({});

const articleReactionReducer = createReducer(
    initialState,
    on(ArticleReactionActions.addArticleReactions,
        (state, action) => adapter.addOne(action.articleReactions, state)
    ),
    on(ArticleReactionActions.upsertArticleReactions,
        (state, action) => adapter.upsertOne(action.articleReactions, state)
    ),
    on(ArticleReactionActions.addArticlesReactions,
        (state, action) => adapter.addMany(action.articlesReactions, state)
    ),
    on(ArticleReactionActions.upsertArticlesReactions,
        (state, action) => adapter.upsertMany(action.articlesReactions, state)
    ),
    on(ArticleReactionActions.updateArticleReactions,
        (state, action) => adapter.updateOne(action.articleReactions, state)
    ),
    on(ArticleReactionActions.updateArticlesReactions,
        (state, action) => adapter.updateMany(action.articlesReactions, state)
    ),
    on(ArticleReactionActions.deleteArticleReactions,
        (state, action) => adapter.removeOne(action.id, state)
    ),
    on(ArticleReactionActions.deleteArticlesReactions,
        (state, action) => adapter.removeMany(action.ids, state)
    ),
    on(ArticleReactionActions.loadArticlesReactions,
        (state, action) => adapter.addAll(action.articlesReactions, state)
    ),
    on(ArticleReactionActions.clearArticlesReactions,
        state => adapter.removeAll(state)
    )
);

export function reducer(state: State | undefined, action: Action) {
    return articleReactionReducer(state, action);
}

export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
} = adapter.getSelectors();
