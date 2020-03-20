import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';
import { Article, ArticleFormValue, ArticleParams } from '../store/article/article.model';


@Injectable({
    providedIn: 'root'
})
export class ArticlesService {

    private endpoint = 'posts';

    constructor(
        private apiService: ApiService,
    ) {
    }

    getArticles(params: ArticleParams = {page: 0}): Observable<{ total: number, offset: number, page: number, posts: Article[] }> {
        return this.apiService.getRequest(this.endpoint, params);
    }

    getArticleById(id: string): Observable<Article> {
        return this.apiService.getRequest(`${this.endpoint}/${id}`);
    }

    createArticle(formValue: ArticleFormValue): Observable<Article> {
        return this.apiService.postRequest(this.endpoint, formValue)
            .pipe(
                map(res => res.post)
            );
    }

    updateArticle(id: string, formValue: Partial<ArticleFormValue>): Observable<Article> {
        return this.apiService.putRequest(`${this.endpoint}/${id}`, formValue)
            .pipe(
                map(res => res.post)
            );
    }

    deleteArticle(id: string): Observable<any> {
        return this.apiService.deleteRequest(`${this.endpoint}/${id}`);
    }
}
