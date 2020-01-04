import { User } from './user.interface';

export interface ArticleComment {
    _id: string;
    _post: string;
    _author: string;
    text: string;
    createdAt: Date;
    updatedAt: Date;
    author?: User;
}
