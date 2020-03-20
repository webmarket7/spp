import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { ArticleTag } from './article-tag.model';
import * as ArticleTagActions from './article-tag.actions';

export const articleTagsFeatureKey = 'articleTags';

export interface State extends EntityState<ArticleTag> {
    // additional entities state properties
}

export const adapter: EntityAdapter<ArticleTag> = createEntityAdapter<ArticleTag>({selectId: (articleTag) => articleTag.seq});

export const initialState: State = adapter.getInitialState({
    // additional entity state properties
});

const articleTagReducer = createReducer(
    initialState,
    on(ArticleTagActions.addArticleTag,
        (state, action) => adapter.addOne(action.articleTag, state)
    ),
    on(ArticleTagActions.upsertArticleTag,
        (state, action) => adapter.upsertOne(action.articleTag, state)
    ),
    on(ArticleTagActions.addArticleTags,
        (state, action) => adapter.addMany(action.articleTags, state)
    ),
    on(ArticleTagActions.upsertArticleTags,
        (state, action) => adapter.upsertMany(action.articleTags, state)
    ),
    on(ArticleTagActions.updateArticleTag,
        (state, action) => adapter.updateOne(action.articleTag, state)
    ),
    on(ArticleTagActions.updateArticleTags,
        (state, action) => adapter.updateMany(action.articleTags, state)
    ),
    on(ArticleTagActions.deleteArticleTag,
        (state, action) => adapter.removeOne(action.id, state)
    ),
    on(ArticleTagActions.deleteArticleTags,
        (state, action) => adapter.removeMany(action.ids, state)
    ),
    on(ArticleTagActions.loadArticleTags,
        (state, action) => adapter.addAll(action.articleTags, state)
    ),
    on(ArticleTagActions.clearArticleTags,
        state => adapter.removeAll(state)
    ),
);

export function reducer(state: State | undefined, action: Action) {
    return articleTagReducer(state, action);
}

export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
} = adapter.getSelectors();
