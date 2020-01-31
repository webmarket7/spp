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
import { articleAuthorsMock } from '../../../common/mocks/article-authors.mock';
import { articleTagsMock } from '../../../common/mocks/article-tags.mock';


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
    users: User[] = articleAuthorsMock;
    tags: ArticleTag[] = articleTagsMock;

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

    constructor(
        private title: Title,
        private activatedRoute: ActivatedRoute
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
                ...(category && {category}),
                ...(authorId && {authorId}),
                ...(tags && {tags})
            };
        }));

        this.queryParamsSubscription = this.articleFilterParams$.subscribe((filterParams: Partial<ArticleParams>) => {
            console.log(filterParams);
        });
    }

    ngOnDestroy(): void {
        this.queryParamsSubscription.unsubscribe();
    }
}
