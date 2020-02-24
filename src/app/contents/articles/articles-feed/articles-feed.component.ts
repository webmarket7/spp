import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { MenuItem } from '../../../common/models/menu-item.interface';
import { User } from '../../../common/models/user.interface';
import { ArticleTag } from '../../../common/models/article-tag.interface';
import { map } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { Observable, Subscription, SubscriptionLike } from 'rxjs';
import { ArticleParams } from '../../../common/models/article-params.interface';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { normalizeQueryParam } from '../../../common/helpers';
import { ArticleTagsService } from '../../../services/article-tags.service';
import { UsersService } from '../../../services/users.service';
import { Article, FullArticle } from '../../../common/models/article.interface';
import { ArticlesService } from '../../../services/articles.service';
import { REACTION_TYPES_BY_CATEGORY } from '../../../common/constants';
import { ArticleReactionsService } from '../../../services/article-reactions.service';


@Component({
    selector: 'articles-feed',
    templateUrl: './articles-feed.component.html',
    styleUrls: ['./articles-feed.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticlesFeedComponent implements OnInit, OnDestroy {
    private articleFilterParams$: Observable<Partial<ArticleParams>>;
    private queryParamsSubscription: SubscriptionLike = Subscription.EMPTY;

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
    articles$: Observable<FullArticle[]>;

    constructor(
        private title: Title,
        private activatedRoute: ActivatedRoute,
        private usersService: UsersService,
        private articleTagsService: ArticleTagsService,
        private articlesService: ArticlesService,
        private articleReactionsService: ArticleReactionsService
    ) {
    }

    ngOnInit(): void {
        this.title.setTitle('Articles Feed');

        this.articles$ = this.articlesService.selectFullArticles();

        this.users$ = this.usersService.selectAllUsers();
        this.usersService.getAllUsers()
            .subscribe((users: User[]) => {
                this.usersService.addAll(users);
            });

        this.tags$ = this.articleTagsService.selectArticleTags();
        this.articleTagsService.getAllTags()
            .subscribe((articleTags: ArticleTag[]) => {
                this.articleTagsService.addAll(articleTags);
            });

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

        this.queryParamsSubscription = this.articleFilterParams$.subscribe((filterParams: ArticleParams) => {
            this.articlesService.getArticles(filterParams)
                .subscribe((articles: Article[]) => {
                    const articlesReactions = this.articlesService.getArticlesReactions(articles);

                    this.articleReactionsService.addAll(articlesReactions);
                    this.articlesService.addAll(articles);
                });
        });
    }

    ngOnDestroy(): void {
        this.queryParamsSubscription.unsubscribe();
    }
}
