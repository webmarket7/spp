import { initialState, reducer } from './articles-feed.reducer';
import {
    loadArticles,
    loadArticlesFailure,
    loadArticlesSuccess,
    loadNextArticlesBatch,
    loadNextArticlesBatchFailure,
    loadNextArticlesBatchSuccess,
    saveArticlesFeedQueryParams
} from './articles-feed.actions';
import { Article } from '../../../../store/article/article.model';
import { articlesListBuilder } from '../../../../common/mocks/article.mock';
import { HttpErrorResponse } from '@angular/common/http';


describe('ArticlesFeed Reducer', () => {

    describe('an unknown action', () => {

        it('should return the previous state', () => {
            const action = {} as any;

            const state = reducer(initialState, action);

            expect(state).toBe(initialState);
        });
    });

    describe('saveArticlesFeedQueryParams action', () => {

        it('should save articles feed query params in state', () => {
            const queryParams = {page: 0};
            const action = saveArticlesFeedQueryParams({queryParams});

            const state = reducer(initialState, action);

            expect(state.lastQueryParams).toEqual(queryParams);
        });
    });

    describe('loadArticles action', () => {

        it('should reflect that it has started loading articles', () => {
            const action = loadArticles({queryParams: {page: 0}});

            const state = reducer(initialState, action);

            expect(state.loading).toBeTruthy();
        });
    });

    describe('loadArticlesSuccess action', () => {

        it('should reflect the loaded information', () => {
            const articles: Article[] = articlesListBuilder(10);
            const action = loadArticlesSuccess({
                response: {
                    total: 12,
                    offset: 0,
                    page: 0,
                    posts: articles
                }
            });
            const state = reducer(initialState, action);

            expect(state.loading).toBeFalsy();
            expect(state.articleIds).toHaveLength(10);
            expect(state.articleIds[0]).toEqual(articles[0].id);
            expect(state.page).toEqual(0);
            expect(state.total).toEqual(12);
        });
    });

    describe('loadArticlesFailure action', () => {

        it('should reflect that error occured while loading articles', () => {
            const error = new HttpErrorResponse({});
            const action = loadArticlesFailure({error});
            const state = reducer(initialState, action);

            expect(state.loading).toBeFalsy();
        });
    });

    describe('loadNextArticlesBatch action', () => {

        it('should reflect that it has started loading next batch of articles', () => {
            const action = loadNextArticlesBatch();

            const state = reducer(initialState, action);

            expect(state.paginating).toBeTruthy();
        });
    });

    describe('loadNextArticlesBatchSuccess action', () => {

        it('should reflect the loaded information', () => {
            const articles: Article[] = articlesListBuilder(2);
            const action = loadNextArticlesBatchSuccess({
                response: {
                    total: 12,
                    offset: 10,
                    page: 1,
                    posts: articles
                }
            });
            const state = reducer(initialState, action);

            expect(state.paginating).toBeFalsy();
            expect(state.articleIds).toHaveLength(2);
            expect(state.articleIds[0]).toEqual(articles[0].id);
            expect(state.page).toEqual(1);
            expect(state.total).toEqual(12);
        });
    });

    describe('loadNextArticlesBatchFailure action', () => {

        it('should reflect that error has occured while loading next batch of articles', () => {
            const error = new HttpErrorResponse({});
            const action = loadNextArticlesBatchFailure({error});
            const state = reducer(initialState, action);

            expect(state.paginating).toBeFalsy();
        });
    });

});
