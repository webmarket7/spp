import { Article } from '../article/article.model';

export type UserRole = 'admin' | 'student' | 'guest';

export interface User {
    id: string;
    username: string;
    role: UserRole;
    firstName: string;
    lastName: string;
    picture: string;
    createdAt: Date;
    updatedAt: Date;
    lastLogin: Date;
    posts?: Article[];
}
