import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { omit, keyBy } from 'lodash';
import { ArticleReactions } from '../common/models/article-reactions.inteface';


@Injectable({
    providedIn: 'root'
})
export class ArticleReactionsService {

    private endpoint = 'reactions';
    private articleReactionsDictionarySubject: BehaviorSubject<{[key: string]: ArticleReactions}> = new BehaviorSubject({});

    constructor(private api: ApiService) {
    }

    selectArticleReactionsDictionary(): Observable<{[key: string]: ArticleReactions}> {
        return this.articleReactionsDictionarySubject.asObservable();
    }

    getCurrentState(): {[key: string]: ArticleReactions} {
        return this.articleReactionsDictionarySubject.getValue() || {};
    }

    addAll(reactionsList: ArticleReactions[]): void {
        this.articleReactionsDictionarySubject.next(keyBy(reactionsList, 'postId'));
    }

    updateOne(reactions: ArticleReactions): void {
        this.articleReactionsDictionarySubject.next({...this.getCurrentState(), [reactions.postId]: reactions});
    }

    toggleReaction(reactionType: 'likes' | 'stars', articleId: string, withAuthorIds: 0 | 1 = 1): Observable<ArticleReactions> {
        return this.api.getRequest(`${this.endpoint}/toggle/${reactionType}/${articleId}/${withAuthorIds}`).pipe(
            map((response) => {
                return omit(response, ['message']);
            })
        );
    }
}
