import { Action, createReducer, on } from '@ngrx/store';
import * as ArticlesFeedActions from './articles-feed.actions';
import { ArticleParams } from '../../../../store/article/article.model';

export const articlesFeedFeatureKey = 'articlesFeed';

export interface State {
    loading: boolean;
    paginating: boolean;
    articleIds: string[];
    lastQueryParams: ArticleParams;
}

export const initialState: State = {
    loading: false,
    paginating: false,
    articleIds: [],
    lastQueryParams: null
};

const articlesFeedReducer = createReducer(
    initialState,
    on(ArticlesFeedActions.saveArticlesFeedQueryParams,
        (state, {queryParams}) => ({...state, lastQueryParams: queryParams})
    ),
    on(ArticlesFeedActions.loadArticles,
        (state) => ({...state, loading: true})
    ),
    on(ArticlesFeedActions.loadArticlesSuccess,
        (state, {articles}) => ({...state, articleIds: articles.map(article => article.id)})
    ),
    on(ArticlesFeedActions.loadArticlesFailure,
        (state) => ({...state, loading: false})
    ),
    on(ArticlesFeedActions.loadNextArticlesBatch,
        (state) => ({...state, paginating: true})
    ),
    on(ArticlesFeedActions.loadNextArticlesBatchSuccess,
        (state, {articles}) => ({
            ...state,
            articleIds: [...state.articleIds, ...articles.map(article => article.id)],
            paginating: false
        })
    ),
    on(ArticlesFeedActions.loadArticlesFailure,
        (state) => ({...state, loading: false})
    ),
);

export function reducer(state: State | undefined, action: Action) {
    return articlesFeedReducer(state, action);
}
