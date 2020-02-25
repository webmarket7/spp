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
    (articles: Article[], usersDictionary: Dictionary<User>, tagsDictionary: Dictionary<ArticleTag>): FullArticle[] => {
        return articles && usersDictionary && tagsDictionary
            ? articles.map((article: Article) => {
                const articleTags = article.tags.map((tagId: number) => tagsDictionary[tagId] || tagId);

                return {...article, articleTags, articleAuthor: usersDictionary[article.author]};
            })
            : articles;
    }
);

export const selectArticlesFeedQueryParams = createSelector(
    selectArticlesFeedState,
    (state) => state.lastQueryParams
);
