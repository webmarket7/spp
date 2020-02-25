import * as fromArticleEditor from './article-editor.reducer';
import { selectArticleEditorState } from './article-editor.selectors';

describe('ArticleEditor Selectors', () => {
  it('should select the feature state', () => {
    const result = selectArticleEditorState({
      [fromArticleEditor.articleEditorFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
