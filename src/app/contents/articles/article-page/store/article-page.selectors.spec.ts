import * as fromArticlePage from './article-page.reducer';
import { selectArticlePageState } from './article-page.selectors';

describe('ArticlePage Selectors', () => {
  it('should select the feature state', () => {
    const result = selectArticlePageState({
      [fromArticlePage.articlePageFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
