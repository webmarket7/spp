import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ArticleTag } from '../common/models/article-tag.interface';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
import { keyBy } from 'lodash';

@Injectable({
    providedIn: 'root'
})
export class ArticleTagsService {

    private endpoint = 'tags';
    private articleTagsSubject: BehaviorSubject<ArticleTag[]> = new BehaviorSubject([]);

    constructor(private api: ApiService) {
    }

    getCurrentState(): ArticleTag[] {
        return this.articleTagsSubject.getValue() || [];
    }

    selectArticleTags(): Observable<ArticleTag[]> {
        return this.articleTagsSubject.asObservable();
    }

    selectArticleTagsDictionary(): Observable<{ [key: number]: ArticleTag }> {
        return this.selectArticleTags().pipe(map((articleTags: ArticleTag[]) => {
            return keyBy(articleTags, 'seq');
        }));
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

    getAllTags(): Observable<Array<ArticleTag>> {
        return this.api.getRequest(`${this.endpoint}/all`);
    }

    getMyTags(): Observable<Array<ArticleTag>> {
        return this.api.getRequest(`${this.endpoint}/my`);
    }

    getTagById(id: number): Observable<ArticleTag> {
        return this.api.getRequest(`${this.endpoint}/${id}`);
    }

    createTag(name: string): Observable<ArticleTag> {
        return this.api.postRequest(this.endpoint, {name})
            .pipe(
                map(res => res.tag[0])
            );
    }

    deleteTagById(id: number): Observable<any> {
        return this.api.deleteRequest(`${this.endpoint}/${id}`);
    }
}
