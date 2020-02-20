import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { Article, FullArticle } from '../common/models/article.interface';
import { updateItemInArray } from '../common/helpers';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';
import { ArticleParams } from '../common/models/article-params.interface';
import { ArticleFormValue } from '../common/models/article-form-value.interface';
import { UsersService } from './users.service';
import { ArticleTagsService } from './article-tags.service';
import { ArticleReactions } from '../common/models/article-reactions.inteface';
import { ArticleReactionsService } from './article-reactions.service';
import { omit } from 'lodash';


@Injectable({
    providedIn: 'root'
})
export class ArticlesService {

    private endpoint = 'posts';
    private articlesSubject: BehaviorSubject<FullArticle[]> = new BehaviorSubject([]);

    constructor(
        private apiService: ApiService,
        private usersService: UsersService,
        private articleTagsService: ArticleTagsService,
        private articleReactionsService: ArticleReactionsService
    ) {
    }

    getArticleReactions(article: Article): ArticleReactions {
        return {
            postId: article.id,
            reactionsCounts: article.reactionsCounts,
            reactionsAuthors: article.reactionsAuthors
        };
    }

    getArticlesReactions(articles: Article[]): ArticleReactions[] {
        return articles.map((article: Article) => {
            return this.getArticleReactions(article);
        });
    }

    getCurrentState(): FullArticle[] {
        return this.articlesSubject.getValue() || [];
    }

    selectArticles(): Observable<Article[]> {
        return this.articlesSubject.asObservable();
    }

    selectFullArticles(): Observable<FullArticle[]> {
        return combineLatest([
            this.selectArticles(),
            this.usersService.selectUsersDictionary(),
            this.articleTagsService.selectArticleTagsDictionary(),
            this.articleReactionsService.selectArticleReactionsDictionary()
        ]).pipe(
            map(([articles, usersDictionary, tagsDictionary, articleReactionsDictionary]) => {
                return articles && usersDictionary && tagsDictionary
                    ? articles.map((article: Article) => {
                        const articleTags = article.tags.map((tagId: number) => tagsDictionary[tagId] || tagId);
                        const reactions = articleReactionsDictionary[article.id];

                        return {
                            ...article,
                            articleTags,
                            articleAuthor: usersDictionary[article.author],
                            ...(reactions && omit(reactions, 'postId'))
                        };
                    })
                    : articles;
            })
        );
    }

    selectFullArticleById(articleId: string): Observable<FullArticle> {
        return this.selectFullArticles().pipe(map((articles: FullArticle[]) => this.findOne(articles, articleId)));
    }

    findOne(articles: FullArticle[], articleId: string): FullArticle {
        return articles.find((article) => article.id === articleId);
    }

    addAll(articles: FullArticle[]): void {
        this.articlesSubject.next(articles);
    }

    addOne(article: FullArticle): void {
        this.articlesSubject.next([article, ...this.getCurrentState()]);
    }

    updateOne(patch: Partial<Article>): void {
        const storedArticle = this.findOne(this.getCurrentState(), patch.id);
        const updatedArticle = {
            ...storedArticle,
            ...patch,
        };

        this.articlesSubject.next(updateItemInArray(this.getCurrentState(), updatedArticle));
    }

    removeOne(articleId: string): void {
        this.articlesSubject.next(this.getCurrentState().filter((article: Article) => article.id !== articleId));
    }

    getArticles(params: ArticleParams = {page: 0}): Observable<Article[]> {
        return this.apiService.getRequest(this.endpoint, params)
            .pipe(
                map(res => res.posts)
            );
    }

    getArticleById(id: string, params = {}): Observable<Article> {
        return this.apiService.getRequest(`${this.endpoint}/${id}`, {...params, withComments: 1});
    }

    createArticle(formValue: ArticleFormValue): Observable<Article> {
        return this.apiService.postRequest(this.endpoint, formValue)
            .pipe(
                map(res => res.post)
            );
    }

    updateArticle(id: string, formValue: ArticleFormValue): Observable<Article> {
        return this.apiService.putRequest(`${this.endpoint}/${id}`, formValue)
            .pipe(
                map(res => res.post)
            );
    }

    deleteArticle(id: string): Observable<any> {
        return this.apiService.deleteRequest(`${this.endpoint}/${id}`);
    }
}
