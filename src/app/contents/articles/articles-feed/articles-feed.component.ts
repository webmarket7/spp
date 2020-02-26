import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MenuItem } from '../../../shared/ui/spp-menu-item/menu-item.interface';
import { map } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { combineLatest, Observable } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { normalizeQueryParam } from '../../../common/helpers';
import { User } from '../../../store/user/user.model';
import { ArticleTag } from '../../../store/article-tag/article-tag.model';
import { select, Store } from '@ngrx/store';
import { State } from '../../../store';
import { loadArticles, loadArticlesAuthors, loadArticlesTags, loadNextArticlesBatch } from './store/articles-feed.actions';
import { selectAllUsers } from '../../../store/user/user.selectors';
import { selectAllArticleTags } from '../../../store/article-tag/article-tag.selectors';
import { selectArticlesFeed, selectArticlesFeedLoading, selectArticlesFeedTotal } from './store/articles-feed.selectors';
import { Article, ArticleParams } from '../../../store/article/article.model';
import { REACTION_TYPES_BY_CATEGORY } from '../../../common/constants';


@Component({
    selector: 'articles-feed',
    templateUrl: './articles-feed.component.html',
    styleUrls: ['./articles-feed.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticlesFeedComponent implements OnInit {
    private articleFilterParams$: Observable<Partial<ArticleParams>>;

    category: 'all' | 'liked' | 'favorite' = 'all';
    views: MenuItem[] = [
        {
            label: 'Default view',
            icon: 'default-view',
            path: 'default'
        },
        {
            label: 'List view',
            icon: 'list-view',
            path: 'list'
        },
        {
            label: 'Tile view',
            icon: 'tile-view',
            path: 'tiles'
        }
    ];
    users$: Observable<User[]>;
    tags$: Observable<ArticleTag[]>;
    articles$: Observable<Article[]>;
    articlesLoading$: Observable<boolean>;
    articlesTotal$: Observable<number>;
    showPaginator$: Observable<boolean>;

    constructor(
        private title: Title,
        private activatedRoute: ActivatedRoute,
        private store: Store<State>,
    ) {
    }

    ngOnInit(): void {
        this.title.setTitle('Articles Feed');
        this.articleFilterParams$ = this.activatedRoute.queryParamMap.pipe(map((queryParamMap: ParamMap) => {
            const category = normalizeQueryParam(queryParamMap.get('category'));

            this.category = (category || 'all') as 'all' | 'liked' | 'favorite';

            const authorId = normalizeQueryParam(queryParamMap.get('authorIds'));
            const tags = normalizeQueryParam(queryParamMap.get('tagIds'));

            return {
                ...(category && category !== 'all' && {reactionType: REACTION_TYPES_BY_CATEGORY[category]}),
                ...(authorId && {authorId}),
                ...(tags && {tags})
            };
        }));

        this.articleFilterParams$.subscribe((filterParams: Partial<ArticleParams>) => {
            this.store.dispatch(loadArticles({queryParams: {page: 0, ...filterParams}}));
        });

        this.store.dispatch(loadArticlesAuthors());
        this.store.dispatch(loadArticlesTags());

        this.users$ = this.store.pipe(select(selectAllUsers));
        this.tags$ = this.store.pipe(select(selectAllArticleTags));
        this.articles$ = this.store.select(selectArticlesFeed);
        this.articlesLoading$ = this.store.select(selectArticlesFeedLoading);
        this.articlesTotal$ = this.store.select(selectArticlesFeedTotal);
        this.showPaginator$ = combineLatest([
            this.articles$.pipe(map((articles) => articles.length)),
            this.articlesTotal$
        ]).pipe(map(([articlesCount, articlesTotal]: number[]) => {
            return articlesTotal > articlesCount;
        }));

    }

    loadMoreArticles(event: MouseEvent): void {
        event.stopPropagation();
        this.store.dispatch(loadNextArticlesBatch());
    }
}
