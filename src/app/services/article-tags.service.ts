import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiService } from './api.service';
import { ArticleTag } from '../store/article-tag/article-tag.model';


@Injectable({
    providedIn: 'root'
})
export class ArticleTagsService {

    private endpoint = 'tags';

    constructor(private api: ApiService) {
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
