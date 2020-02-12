import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GlobalService } from './global.service';
import { Article, FullArticle } from '../common/models/article.interface';
import { fullArticlesList } from '../common/mocks/article.mock';
import { ArticleTagsService } from './article-tags.service';
import { ArticleTag } from '../common/models/article-tag.interface';
import { intersectionWith } from 'lodash';
import { generateRandomAlphanumericStr, updateItemInArray } from '../common/helpers';
import { map } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class ArticlesService {
    private articlesSubject: BehaviorSubject<FullArticle[]> = new BehaviorSubject(fullArticlesList);

    constructor(
        private globalService: GlobalService,
        private articleTagsService: ArticleTagsService) {
    }

    getCurrentState(): FullArticle[] {
        return this.articlesSubject.getValue() || [];
    }

    getAll(): Observable<FullArticle[]> {
        return this.articlesSubject.asObservable();
    }

    getOne(articleId: string): Observable<FullArticle> {
        return this.getAll().pipe(map((articles: FullArticle[]) => this.findOne(articles, articleId)));
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
            articleTags: intersectionWith(
                this.articleTagsService.getCurrentState(),
                patch.tags,
                (tag: ArticleTag, seq: number) => +tag.seq === +seq)
        };

        this.articlesSubject.next(updateItemInArray(this.getCurrentState(), updatedArticle));
    }

    removeOne(articleId: string): void {
        this.articlesSubject.next(this.getCurrentState().filter((article: Article) => article.id !== articleId));
    }

    createFullArticle(formValue: Partial<Article>): FullArticle {
        return {
            id: generateRandomAlphanumericStr(24),
            author: this.globalService.currentUser.id,
            tags: formValue.tags,
            title: formValue.title,
            description: formValue.description,
            text: formValue.text,
            image: 'https://picsum.photos/640/480?random=1',
            createdAt: new Date(),
            updatedAt: new Date(),
            reactionsCounts: {
                likes: 0,
                stars: 0,
                uni: 0,
            },
            reactionsAuthors: {
                likes: [],
                stars: [],
                uni: [],
            },
            articleTags: intersectionWith(
                this.articleTagsService.getCurrentState(),
                formValue.tags,
                (tag: ArticleTag, seq: number) => +tag.seq === +seq),
            articleAuthor: this.globalService.currentUser
        };
    }
}
