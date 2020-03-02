import { async, ComponentFixture, TestBed } from '@angular/core/testing';

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
    const initialState = { users: {}, articleTags: {}, articleReactions: {}, articles: {}, articlesFeed: {} };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule.withRoutes(routes)],
            declarations: [
                ArticlesFeedComponent,
                UserNamePipeMock
            ],
            providers: [
                provideMockStore({ initialState }),
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
});
