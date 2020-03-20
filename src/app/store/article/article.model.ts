import { ArticleTag } from '../article-tag/article-tag.model';
import { User } from '../user/user.model';
import { ArticleReactionsAuthors, ArticleReactionsCounts } from '../article-reaction/article-reactions.model';

export interface ArticleParams {
    page: number;
    reactionType?: 'likes' | 'stars';
    authorId?: string;
    tags?: string;
}

export interface ArticleFormValue {
    title: string;
    text: string;
    description: string;
    image: string | File;
    tags: number[];
}

export interface Article {
    id: string;
    author: string;
    tags: number[];
    title: string;
    description: string;
    text: string;
    image: string;
    createdAt: Date;
    updatedAt: Date;
    reactionsCounts?: ArticleReactionsCounts;
    reactionsAuthors?: ArticleReactionsAuthors;
}

export interface FullArticle extends Article {
    articleTags?: ArticleTag[];
    articleAuthor?: User;
}
