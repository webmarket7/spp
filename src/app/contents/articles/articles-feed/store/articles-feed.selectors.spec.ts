import * as fromArticlesFeed from './articles-feed.reducer';
import { selectArticlesFeedState } from './articles-feed.selectors';

describe('ArticlesFeed Selectors', () => {
  it('should select the feature state', () => {
    const result = selectArticlesFeedState({
      [fromArticlesFeed.articlesFeedFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
