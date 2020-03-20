import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ArticleComment } from '../store/article-comment/article-comment.model';

@Injectable({
    providedIn: 'root'
})
export class ArticleCommentsService {

    endpoint = 'comments';

    constructor(private apiService: ApiService) {
    }

    getComments(articleId: string): Observable<ArticleComment[]> {
        return this.apiService.getRequest(`${this.endpoint}/${articleId}`);
    }

    createComment(articleId: string, formValue: Partial<ArticleComment>): Observable<ArticleComment> {
        return this.apiService.postRequest(`${this.endpoint}/${articleId}`, {articleId, ...formValue})
            .pipe(
                map(res => res.comment)
            );
    }

    updateComment(articleId: string, commentId: string, formValue: Partial<ArticleComment>): Observable<ArticleComment> {
        return this.apiService.putRequest(`${this.endpoint}/${articleId}/${commentId}`, formValue)
            .pipe(
                map(res => res.comment)
            );
    }

    deleteComment(articleId: string, commentId: string): Observable<any> {
        return this.apiService.deleteRequest(`${this.endpoint}/${articleId}/${commentId}`)
            .pipe(
                map((response: { commId: string, message: string, articleId: string }) => response.commId)
            );
    }
}
