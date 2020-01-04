import { User } from './user.interface';

export interface ArticleTag {
    seq: number;
    author: User;
    createdAt: Date;
    name: string;
}
