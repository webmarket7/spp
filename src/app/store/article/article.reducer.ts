import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Article } from './article.model';
import * as ArticleActions from './article.actions';

export const articlesFeatureKey = 'articles';

export interface State extends EntityState<Article> {
}

export const adapter: EntityAdapter<Article> = createEntityAdapter<Article>();

export const initialState: State = adapter.getInitialState({});

const articleReducer = createReducer(
    initialState,
    on(ArticleActions.addArticle,
        (state, action) => adapter.addOne(action.article, state)
    ),
    on(ArticleActions.upsertArticle,
        (state, action) => adapter.upsertOne(action.article, state)
    ),
    on(ArticleActions.addArticles,
        (state, action) => adapter.addMany(action.articles, state)
    ),
    on(ArticleActions.upsertArticles,
        (state, action) => adapter.upsertMany(action.articles, state)
    ),
    on(ArticleActions.updateArticle,
        (state, action) => adapter.updateOne(action.article, state)
    ),
    on(ArticleActions.updateArticles,
        (state, action) => adapter.updateMany(action.articles, state)
    ),
    on(ArticleActions.deleteArticle,
        (state, action) => adapter.removeOne(action.id, state)
    ),
    on(ArticleActions.deleteArticles,
        (state, action) => adapter.removeMany(action.ids, state)
    ),
    on(ArticleActions.loadArticles,
        (state, action) => adapter.addAll(action.articles, state)
    ),
    on(ArticleActions.clearArticles,
        state => adapter.removeAll(state)
    ),
);

export function reducer(state: State | undefined, action: Action) {
    return articleReducer(state, action);
}

export const {selectEntities} = adapter.getSelectors();
