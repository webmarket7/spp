import { ArticleReactionsAuthors, ArticleReactionsCounts } from './article-reactions.inteface';
import { ArticleTag } from './article-tag.interface';
import { User } from './user.interface';

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
