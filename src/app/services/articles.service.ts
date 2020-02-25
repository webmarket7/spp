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
