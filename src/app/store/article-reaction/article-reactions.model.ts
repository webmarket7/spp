export interface ArticleReactionsCounts {
    likes: number;
    stars: number;
    uni: number;
}

export interface ArticleReactionsAuthors {
    likes: string[];
    stars: string[];
    uni: string[];
}

export interface ArticleReactions {
    postId: string;
    reactionsCounts: ArticleReactionsCounts;
    reactionsAuthors: ArticleReactionsAuthors;
}
