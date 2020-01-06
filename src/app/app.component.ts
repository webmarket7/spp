import { Component } from '@angular/core';
import { User } from './common/models/user.interface';
import { UserMock } from './common/mocks/user.mock';
import { FullArticle } from './common/models/article.interface';
import { fullArticlesList } from './common/mocks/article.mock';
import { ArticleComment } from './common/models/article-comment.interface';
import { ArticleCommentMock } from './common/mocks/article-comment.mock';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    scarceUser: User = new UserMock();
    fullUser: User = new UserMock('http://robohash.org/set_set1/bgset_bg2/kQqaIfGqxsjFoNIT', 'Test', 'Test');
    articles: FullArticle[] = fullArticlesList;
    comments: ArticleComment[] = [];

    articleTrackByFn = (index: number, item: FullArticle): string => item.id;
    commentTrackByFn = (index: number, item: ArticleComment): string => item._id;

    constructor() {
    }

    createComment(text: string): void {
        this.comments =  [...this.comments, new ArticleCommentMock(text)];
    }
}
