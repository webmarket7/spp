import { ArticleReactionsAuthors, ArticleReactionsCounts } from './article-reactions.inteface';

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

