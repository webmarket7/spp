import { ArticleComment } from '../models/article-comment.interface';
import { User } from '../models/user.interface';
import { UserMock } from './user.mock';

export class ArticleCommentMock implements ArticleComment {
    _author: 'f5w2iz8xu5rpvahd08a1byp2';
    _id: 'l4mp5apvjbjkciig31t7z1cu';
    _post: 'l3mx5apdjbjkkiiv31t7z1cu';
    author: User = new UserMock();
    createdAt: Date = new Date();
    text: string;
    updatedAt: Date = new Date();

    constructor(text: string) {
        this.text = text;
    }
}
