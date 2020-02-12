import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ArticleTag } from '../common/models/article-tag.interface';
import { articleTagsMock } from '../common/mocks/article-tags.mock';
import { GlobalService } from './global.service';

@Injectable({
    providedIn: 'root'
})
export class ArticleTagsService {
    private articleTagsSubject: BehaviorSubject<ArticleTag[]> = new BehaviorSubject(articleTagsMock);

    constructor(private globalService: GlobalService) {
    }

    getCurrentState(): ArticleTag[] {
        return this.articleTagsSubject.getValue() || [];
    }

    getAll(): Observable<ArticleTag[]> {
        return this.articleTagsSubject.asObservable();
    }

    addAll(articleTags: ArticleTag[]): void {
        this.articleTagsSubject.next(articleTags);
    }

    addOne(articleTag: ArticleTag): void {
        this.articleTagsSubject.next([articleTag, ...this.getCurrentState()]);
    }

    removeOne(articleTagId: number): void {
        this.articleTagsSubject.next(this.getCurrentState().filter((articleTag: ArticleTag) => articleTag.seq !== articleTagId));
    }

    createArticleTag(value: string): ArticleTag {
        return {
            seq: this.getCurrentState().length + 1,
            author: this.globalService.currentUser,
            createdAt: new Date(),
            name: value
        };
    }
}
