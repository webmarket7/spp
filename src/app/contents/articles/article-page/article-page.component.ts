import { Component, OnDestroy, OnInit } from '@angular/core';
import { Article, FullArticle } from '../../../common/models/article.interface';
import { Observable, Subscription, SubscriptionLike } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../services/articles.service';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, withLatestFrom } from 'rxjs/operators';
import { Location } from '@angular/common';
import { ArticleReactions } from '../../../common/models/article-reactions.inteface';
import { ArticleReactionsService } from '../../../services/article-reactions.service';
import { User } from '../../../common/models/user.interface';
import { ArticleTag } from '../../../common/models/article-tag.interface';
import { UsersService } from '../../../services/users.service';
import { ArticleTagsService } from '../../../services/article-tags.service';
import { AuthService } from '../../../auth/auth.service';

@Component({
    selector: 'article-page',
    templateUrl: './article-page.component.html',
    styleUrls: ['./article-page.component.scss']
})
export class ArticlePageComponent implements OnInit, OnDestroy {

    article$: Observable<FullArticle>;
    articleSubscription: SubscriptionLike = Subscription.EMPTY;
    articleId: string;
    article: FullArticle;

    users$: Observable<User[]>;
    tags$: Observable<ArticleTag[]>;

    likesCount = 0;
    liked = false;
    favsCount = 0;
    favorite = false;

    constructor(private title: Title,
                private articlesService: ArticlesService,
                private authService: AuthService,
                private usersService: UsersService,
                private articleTagsService: ArticleTagsService,
                private articleReactionsService: ArticleReactionsService,
                private activatedRoute: ActivatedRoute,
                private location: Location) {
    }

    ngOnInit(): void {
        this.articleId = this.activatedRoute.snapshot.paramMap.get('articleId');
        this.articlesService.getArticleById(this.articleId).subscribe((article: Article) => {
            this.articlesService.addOne(article);
        });

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

        this.article$ = this.articlesService.selectFullArticleById(this.articleId);
        this.articleSubscription = this.article$
            .pipe(
                filter((article: FullArticle) => !!article),
                withLatestFrom(this.authService.getCurrentUser())
            )
            .subscribe(([article, currentUser]: [FullArticle, User]) => {
                this.article = article;
                this.updateReactions(article, currentUser);
                this.title.setTitle(article.title);
            });
    }

    ngOnDestroy(): void {
        this.articleSubscription.unsubscribe();
    }

    updateReactions(article: FullArticle, currentUser: User) {
        const {reactionsCounts, reactionsAuthors} = article;

        if (reactionsCounts) {
            this.likesCount = reactionsCounts.likes;
            this.favsCount = reactionsCounts.stars;
        }

        if (reactionsAuthors && currentUser) {
            const currentUserId = currentUser.id;

            this.liked = reactionsAuthors.likes.includes(currentUserId);
            this.favorite = reactionsAuthors.stars.includes(currentUserId);
        }
    }

    toggleLike(): void {
        this.articleReactionsService.toggleReaction('likes', this.article.id)
            .subscribe((articleReactions: ArticleReactions) => {
                this.articleReactionsService.updateOne(articleReactions);
            });
    }

    toggleFav(): void {
        this.articleReactionsService.toggleReaction('stars', this.article.id)
            .subscribe((articleReactions: ArticleReactions) => {
                this.articleReactionsService.updateOne(articleReactions);
            });
    }

    deleteArticle(event: MouseEvent): void {
        event.stopPropagation();

        this.articlesService.deleteArticle(this.articleId).subscribe(() => {
            this.location.back();
            this.articlesService.removeOne(this.articleId);
        });
    }
}
