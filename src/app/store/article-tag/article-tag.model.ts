import { User } from '../user/user.model';

export interface ArticleTag {
    seq: number;
    author: User;
    createdAt: Date;
    name: string;
}
