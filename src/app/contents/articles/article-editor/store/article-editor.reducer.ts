import { Action, createReducer, on } from '@ngrx/store';
import * as ArticleEditorActions from './article-editor.actions';

export const articleEditorFeatureKey = 'articleEditor';

export interface State {
    tagsLoading: boolean;
    tagIds: number[];
}

export const initialState: State = {
    tagsLoading: false,
    tagIds: []
};

const articleEditorReducer = createReducer(
    initialState,
    on(ArticleEditorActions.loadArticle, (state, { articleId }) => ({...state, articleId})),
    on(ArticleEditorActions.loadAllTags, (state) => {
        return {
            ...state,
            tagsLoading: true
        };
    }),
    on(ArticleEditorActions.loadAllTagsSuccess, (state, { articleTags }) => {
        return {
            ...state,
            tagIds: articleTags.map(tag => tag.seq),
            tagsLoading: false
        };
    }),
    on(ArticleEditorActions.loadAllTagsFailure, (state) => ({...state, tagsLoading: false})),
    on(ArticleEditorActions.createTagSuccess, (state, { articleTag }) => {
        return {
            ...state,
            tagIds: [articleTag.seq, ...state.tagIds]
        };
    }),
    on(ArticleEditorActions.deleteTagSuccess, (state, { articleTagId }) => {
        return {...state, tagIds: state.tagIds.filter(((id: number) => articleTagId !== id))};
    })
);

export function reducer(state: State | undefined, action: Action) {
    return articleEditorReducer(state, action);
}
