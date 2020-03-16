import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { cold, hot } from 'jest-marbles';

import { ArticlesFeedEffects } from './articles-feed.effects';
import { Article } from '../../../../store/article/article.model';
import { ArticlesService } from '../../../../services/articles.service';

import * as ArticlesFeedActions from './articles-feed.actions';
import * as ArticlesActions from '../../../../store/article/article.actions';
import * as ArticleReactionsActions from '../../../../store/article-reaction/article-reaction.actions';
import * as fromArticlesFeed from './articles-feed.reducer';

import { getArticlesReactions } from '../../../../store/article-reaction/article-reaction-helpers';
import { articlesListBuilder } from '../../../../common/mocks/article.mock';
import { ArticleTagsService } from '../../../../services/article-tags.service';
import { UsersService } from '../../../../services/users.service';
import { selectArticlesFeedQueryParams } from './articles-feed.selectors';


describe('ArticlesFeedEffects', () => {
    let actions$: Observable<any>;
    let effects: ArticlesFeedEffects;
    let store: MockStore<fromArticlesFeed.State>;

    let articlesService: ArticlesService;
    let articleTagsService: ArticleTagsService;
    let usersService: UsersService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ArticlesFeedEffects,
                provideMockActions(() => actions$),
                provideMockStore({
                    initialState: {
                        loading: false,
                        paginating: false,
                        articleIds: [],
                        page: 0,
                        total: 0,
                        lastQueryParams: null
                    },
                    selectors: [
                        {
                            selector: selectArticlesFeedQueryParams,
                            value: {page: 0}
                        }
                    ]
                }),
                {
                    provide: ArticleTagsService,
                    useValue: {
                        getAllTags: jest.fn(),
                    },
                },
                {
                    provide: UsersService,
                    useValue: {
                        getAllUsers: jest.fn(),
                    },
                },
                {
                    provide: ArticlesService,
                    useValue: {
                        getArticles: jest.fn(),
                    },
                },
            ]
        });

        effects = TestBed.get<ArticlesFeedEffects>(ArticlesFeedEffects);
        store = TestBed.get(Store);
        articlesService = TestBed.get(ArticlesService);
        articleTagsService = TestBed.get(ArticleTagsService);
        usersService = TestBed.get(UsersService);
    });

    it('should be created', () => {
        expect(effects).toBeTruthy();
    });

    describe('loadArticles$', () => {
        it('should return appropriate actions with the response from server on successfull initial loading of articles', () => {
            const queryParams = {page: 0};
            const articles: Article[] = articlesListBuilder(10);
            const response = {
                total: 12,
                offset: 0,
                page: 0,
                posts: articles
            };
            const articlesReactions = getArticlesReactions(response.posts);

            const action = ArticlesFeedActions.loadArticles({queryParams});

            const loadArticlesAction = ArticlesActions.loadArticles({articles: response.posts});
            const loadArticlesReactionsAction = ArticleReactionsActions.loadArticlesReactions({articlesReactions});
            const saveArticlesFeedQueryParamsAction = ArticlesFeedActions.saveArticlesFeedQueryParams({queryParams});
            const loadArticlesSuccessAction = ArticlesFeedActions.loadArticlesSuccess({response});

            actions$ = hot('-a', {a: action});

            const serverResponse = cold('-a|', {a: response});
            const expected = cold('--(abcd)', {
                a: loadArticlesAction,
                b: loadArticlesReactionsAction,
                c: saveArticlesFeedQueryParamsAction,
                d: loadArticlesSuccessAction
            });

            articlesService.getArticles = jest.fn(() => serverResponse);

            expect(effects.loadArticles$).toBeObservable(expected);
        });

        it('should return an loadArticlesFailure action, with an error, when initial loading of articles fails', () => {
            const queryParams = {page: 0};
            const error = new Error();
            const action = ArticlesFeedActions.loadArticles({queryParams});
            const outcome = ArticlesFeedActions.loadArticlesFailure({error});

            actions$ = hot('-a', {a: action});

            const serverResponse = cold('-#', {}, error);
            const expected = cold('--a', {a: outcome});

            articlesService.getArticles = jest.fn(() => serverResponse);

            expect(effects.loadArticles$).toBeObservable(expected);
        });
    });

    describe('loadNextArticlesBatch$', () => {

        it('should return appropriate actions with the response from server on successfull articles pagination', () => {
            const queryParams = {page: 1};
            const articles: Article[] = articlesListBuilder(2);
            const response = {
                total: 12,
                offset: 10,
                page: 1,
                posts: articles
            };
            const articlesReactions = getArticlesReactions(response.posts);

            const action = ArticlesFeedActions.loadNextArticlesBatch();

            const upsertArticlesAction = ArticlesActions.upsertArticles({articles: response.posts});
            const addArticlesReactionsAction = ArticleReactionsActions.addArticlesReactions({articlesReactions});
            const saveArticlesFeedQueryParamsAction = ArticlesFeedActions.saveArticlesFeedQueryParams({queryParams});
            const loadNextArticlesBatchSuccess = ArticlesFeedActions.loadNextArticlesBatchSuccess({response});

            actions$ = hot('-a', {a: action});

            const serverResponse = cold('-a|', {a: response});
            const expected = cold('--(abcd)', {
                a: upsertArticlesAction,
                b: addArticlesReactionsAction,
                c: saveArticlesFeedQueryParamsAction,
                d: loadNextArticlesBatchSuccess
            });

            articlesService.getArticles = jest.fn(() => serverResponse);

            expect(effects.loadNextArticlesBatch$).toBeObservable(expected);
        });

        it('should return an loadNextArticlesBatchFailure action, with an error, when articles pagination fails', () => {
            const error = new Error();
            const action = ArticlesFeedActions.loadNextArticlesBatch();
            const outcome = ArticlesFeedActions.loadNextArticlesBatchFailure({error});

            actions$ = hot('-a', {a: action});

            const serverResponse = cold('-#', {}, error);
            const expected = cold('--a', {a: outcome});

            articlesService.getArticles = jest.fn(() => serverResponse);

            expect(effects.loadNextArticlesBatch$).toBeObservable(expected);
        });
    });
});
