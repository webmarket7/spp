import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { omit } from 'lodash';
import { ArticleReactions } from '../store/article-reaction/article-reactions.model';


@Injectable({
    providedIn: 'root'
})
export class ArticleReactionsService {

    private endpoint = 'reactions';

    constructor(private api: ApiService) {
    }

    toggleReaction(reactionType: 'likes' | 'stars', articleId: string, withAuthorIds: 0 | 1 = 1): Observable<ArticleReactions> {
        return this.api.getRequest(`${this.endpoint}/toggle/${reactionType}/${articleId}/${withAuthorIds}`).pipe(
            map((response) => {
                return omit(response, ['message']);
            })
        );
    }
}
