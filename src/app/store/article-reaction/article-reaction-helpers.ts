import { Article } from '../article/article.model';
import { ArticleReactions } from './article-reactions.model';

export function getArticleReactions(article: Article): ArticleReactions {
    return {
        postId: article.id,
        reactionsCounts: article.reactionsCounts,
        reactionsAuthors: article.reactionsAuthors
    };
}

export function getArticlesReactions(articles: Article[]): ArticleReactions[] {
    return articles.map((article: Article) => {
        return getArticleReactions(article);
    });
}
