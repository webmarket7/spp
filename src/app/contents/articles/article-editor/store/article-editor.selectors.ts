import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromArticleEditor from './article-editor.reducer';
import { selectArticleTagsEntities } from '../../../../store/article-tag/article-tag.selectors';
import { selectEntitiesByIds } from '../../../../store/common/selectors-helpers';

export const selectArticleEditorState = createFeatureSelector<fromArticleEditor.State>(
    fromArticleEditor.articleEditorFeatureKey
);

export const selectAllTagsLoading = createSelector(
    selectArticleEditorState,
    (state) => state.tagsLoading
);

export const selectAllTagIds = createSelector(
    selectArticleEditorState,
    (state) => state.tagIds
);

export const selectAllTags = createSelector(
    selectAllTagIds,
    selectArticleTagsEntities,
    selectEntitiesByIds
);
