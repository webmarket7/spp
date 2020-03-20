import * as fromArticlesFeed from './articles-feed.reducer';
import { selectArticles, selectArticlesFeedState } from './articles-feed.selectors';
import { articlesListBuilder } from '../../../../common/mocks/article.mock';
import { Article } from '../../../../store/article/article.model';


describe('ArticlesFeed Selectors', () => {
    const articles: Article[] = articlesListBuilder(3);

    const articleEntities = {
        [articles[0].id]: articles[0],
        [articles[1].id]: articles[1]};

    const selectedArticleIds = [
        articles[1].id,
        articles[0].id
    ];

    it('should select the feature state', () => {
        const result = selectArticlesFeedState({
            [fromArticlesFeed.articlesFeedFeatureKey]: {}
        });

        expect(result).toEqual({});
    });

    it('should select articles based on ids in state', () => {
        const result = selectArticles.projector(selectedArticleIds, articleEntities);

        expect(result).toHaveLength(2);
        expect(result[0].id).toEqual(articles[1].id);
    });
});
