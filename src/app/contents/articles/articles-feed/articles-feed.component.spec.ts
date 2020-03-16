import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { ArticlesFeedComponent } from './articles-feed.component';
import { NO_ERRORS_SCHEMA, Pipe, PipeTransform } from '@angular/core';
import { User } from '../../../store/user/user.model';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, Routes } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';
import { State } from '../../../store';
import * as fromArticle from '../../../store/article/article.reducer';
import * as fromUser from '../../../store/user/user.reducer';
import * as fromArticleTag from '../../../store/article-tag/article-tag.reducer';
import * as fromArticlesFeed from './store/articles-feed.reducer';
import * as fromArticleReaction from '../../../store/article-reaction/article-reaction.reducer';
import { loadArticles, loadArticlesAuthors, loadArticlesTags } from './store/articles-feed.actions';
import { of } from 'rxjs';
import { selectAllUsers } from '../../../store/user/user.selectors';
import { selectAllArticleTags } from '../../../store/article-tag/article-tag.selectors';
import { selectArticlesFeedLoading, selectArticlesFeedTotal } from './store/articles-feed.selectors';
import { userBuilder } from '../../../common/mocks/user.mock';


@Pipe({
    name: 'userName'
})
class UserNamePipeMock implements PipeTransform {
    transform(user: User): any {
        return 'test@test.com';
    }
}

const routes: Routes = [
    {
        path: '',
        component: ArticlesFeedComponent
    }
];

describe('ArticlesFeedComponent', () => {
    let component: ArticlesFeedComponent;
    let fixture: ComponentFixture<ArticlesFeedComponent>;
    let router: Router;
    let store: MockStore<{
        users: fromUser.State,
        articleTags: fromArticleTag.State,
        articleReactions: fromArticleReaction.State,
        articles: fromArticle.State,
        articlesFeed: fromArticlesFeed.State
    }>;
    const initialState = {users: {}, articleTags: {}, articleReactions: {}, articles: {}, articlesFeed: {}};

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule.withRoutes(routes)],
            declarations: [
                ArticlesFeedComponent,
                UserNamePipeMock
            ],
            providers: [
                provideMockStore({
                    initialState,
                    selectors: [
                        {
                            selector: selectAllUsers,
                            value: [{id: 1}]
                        },
                        {
                            selector: selectAllArticleTags,
                            value: []
                        },
                        {
                            selector: selectArticlesFeedLoading,
                            value: false
                        },
                        {
                            selector: selectArticlesFeedTotal,
                            value: 0
                        }
                    ]
                }),
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ArticlesFeedComponent);
        router = TestBed.get(Router);
        component = fixture.componentInstance;

        fixture.detectChanges();
        router.initialNavigation();
        store = TestBed.get<Store<State>>(Store);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should load all necessary data from server', fakeAsync(() => {
        const dispatchSpy = spyOn(store, 'dispatch');
        component.getArticleFilterParams = jest.fn().mockReturnValue(of({}));

        component.fetchData();
        tick();

        const loadArticleAuthorsAction = loadArticlesAuthors();
        const loadArticleTagsAction = loadArticlesTags();
        const loadArticlesAction = loadArticles({queryParams: {page: 0}});

        expect(dispatchSpy).toHaveBeenCalledTimes(3);
        expect(dispatchSpy).toHaveBeenNthCalledWith(1, loadArticleAuthorsAction);
        expect(dispatchSpy).toHaveBeenNthCalledWith(2, loadArticleTagsAction);
        expect(dispatchSpy).toHaveBeenNthCalledWith(3, loadArticlesAction);
    }));
});
