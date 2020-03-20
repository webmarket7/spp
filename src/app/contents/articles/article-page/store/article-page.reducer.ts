import { Action, createReducer, on } from '@ngrx/store';
import * as ArticlePageActions from './article-page.actions';
import { ArticleComment } from '../../../../store/article-comment/article-comment.model';

export const articlePageFeatureKey = 'articlePage';

export interface State {
    articleId: string;
    articleAuthorLoading: boolean;
    articleTagsLoading: boolean;
    articleCommentIds: string[];
}

export const initialState: State = {
    articleId: null,
    articleCommentIds: null,
    articleAuthorLoading: false,
    articleTagsLoading: false
};

const articlePageReducer = createReducer(
    initialState,
    on(ArticlePageActions.loadArticleSuccess, (state, {article}) => ({...state, articleId: article.id})),
    on(ArticlePageActions.loadArticleAuthor, (state) => ({...state, articleAuthorLoading: true})),
    on(ArticlePageActions.loadArticleAuthorSuccess, (state) => ({...state, articleAuthorLoading: false})),
    on(ArticlePageActions.loadArticleAuthorFailure, (state) => ({...state, articleAuthorLoading: false})),
    on(ArticlePageActions.loadArticleTags, (state) => ({...state, articleTagsLoading: true})),
    on(ArticlePageActions.loadArticleTagsSuccess, (state) => ({...state, articleTagsLoading: false})),
    on(ArticlePageActions.loadArticleTagsFailure, (state) => ({...state, articleTagsLoading: false})),
    on(ArticlePageActions.loadArticleCommentsSuccess, (state, {articleComments}) => ({
        ...state,
        articleCommentIds: articleComments.map((comment: ArticleComment) => comment._id)
    })),
    on(ArticlePageActions.createArticleCommentSuccess, (state, { articleComment }) => ({
        ...state,
        articleCommentIds: [articleComment._id, ...state.articleCommentIds]
    })),
    on(ArticlePageActions.deleteArticleCommentSuccess, (state, { commentId }) => ({
        ...state,
        articleCommentIds: state.articleCommentIds.filter((id) => commentId !== id)
    }))
);

export function reducer(state: State | undefined, action: Action) {
    return articlePageReducer(state, action);
}
