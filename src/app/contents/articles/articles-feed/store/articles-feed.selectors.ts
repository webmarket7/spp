import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromArticlesFeed from './articles-feed.reducer';
import * as fromArticle from '../../../../store/article/article.selectors';
import { selectEntitiesByIds } from '../../../../store/common/selectors-helpers';
import { selectUserEntities } from '../../../../store/user/user.selectors';
import { selectArticleTagsEntities } from '../../../../store/article-tag/article-tag.selectors';
import { Article, FullArticle } from '../../../../store/article/article.model';
import { Dictionary } from '@ngrx/entity';
import { ArticleTag } from '../../../../store/article-tag/article-tag.model';
import { User } from '../../../../store/user/user.model';
import { selectArticlesReactionsEntities } from '../../../../store/article-reaction/article-reactions.selectors';
import { ArticleReactions } from '../../../../store/article-reaction/article-reactions.model';


export const selectArticlesFeedState = createFeatureSelector<fromArticlesFeed.State>(
    fromArticlesFeed.articlesFeedFeatureKey
);

export const selectArticleIds = createSelector(
    selectArticlesFeedState,
    (state) => state.articleIds
);

export const selectArticles = createSelector(
    selectArticleIds,
    fromArticle.selectArticleEntities,
    selectEntitiesByIds
);

export const selectArticlesFeed = createSelector(
    selectArticles,
    selectUserEntities,
    selectArticleTagsEntities,
    selectArticlesReactionsEntities,
    (
        articles: Article[],
        usersDictionary: Dictionary<User>,
        tagsDictionary: Dictionary<ArticleTag>,
        articleReactionsDictionary: Dictionary<ArticleReactions>
    ): FullArticle[] => {
        return articles && usersDictionary && tagsDictionary && articleReactionsDictionary
            ? articles.map((article: Article) => {
                const articleTags = article.tags.map((tagId: number) => tagsDictionary[tagId] || tagId);
                const { reactionsAuthors, reactionsCounts } = articleReactionsDictionary[article.id];

                return {...article, articleTags, articleAuthor: usersDictionary[article.author], reactionsAuthors, reactionsCounts};
            })
            : articles;
    }
);

export const selectArticlesFeedQueryParams = createSelector(
    selectArticlesFeedState,
    (state) => state.lastQueryParams
);

export const selectArticlesFeedLoading = createSelector(
    selectArticlesFeedState,
    (state) => state.loading
);

export const selectArticlesFeedTotal = createSelector(
    selectArticlesFeedState,
    (state) => state.total
);
