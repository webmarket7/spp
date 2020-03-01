import { Action, createReducer, on } from '@ngrx/store';
import * as ArticlesFeedActions from './articles-feed.actions';
import { ArticleParams } from '../../../../store/article/article.model';

export const articlesFeedFeatureKey = 'articlesFeed';

export interface State {
    loading: boolean;
    paginating: boolean;
    page: number;
    total: number;
    articleIds: string[];
    lastQueryParams: ArticleParams;
}

export const initialState: State = {
    loading: false,
    paginating: false,
    articleIds: [],
    page: 0,
    total: 0,
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
    on(ArticlesFeedActions.loadArticlesSuccess, (state, {response}) => {
        const { posts, page, total } = response;

        return {
            ...state,
            articleIds: posts.map(article => article.id),
            page,
            total,
            loading: false
        };
    }),
    on(ArticlesFeedActions.loadArticlesFailure,
        (state) => ({...state, loading: false})
    ),
    on(ArticlesFeedActions.loadNextArticlesBatch,
        (state) => ({...state, paginating: true})
    ),
    on(ArticlesFeedActions.loadNextArticlesBatchSuccess, (state, {response}) => {
        const { posts, page, total } = response;

        return {
            ...state,
            articleIds: [...state.articleIds, ...posts.map(article => article.id)],
            page,
            total,
            paginating: false
        };
    }),
    on(ArticlesFeedActions.loadArticlesFailure,
        (state) => ({...state, loading: false})
    ),
);

export function reducer(state: State | undefined, action: Action) {
    return articlesFeedReducer(state, action);
}
