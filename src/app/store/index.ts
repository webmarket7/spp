import { Action, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromAuth from './auth/auth.reducer';
import * as fromArticle from './article/article.reducer';
import * as fromArticleComment from './article-comment/article-comment.reducer';
import * as fromArticleTag from './article-tag/article-tag.reducer';
import * as fromUser from './user/user.reducer';
import * as fromArticleReaction from './article-reaction/article-reaction.reducer';
import { InjectionToken } from '@angular/core';

export interface State {
    [fromAuth.authFeatureKey]: fromAuth.State;
    [fromArticle.articlesFeatureKey]: fromArticle.State;
    [fromArticleComment.articleCommentsFeatureKey]: fromArticleComment.State;
    [fromArticleTag.articleTagsFeatureKey]: fromArticleTag.State;
    [fromUser.usersFeatureKey]: fromUser.State;
    [fromArticleReaction.articleReactionsFeatureKey]: fromArticleReaction.State;
}

export const ROOT_REDUCERS = new InjectionToken<
    ActionReducerMap<State, Action>
    >('Root reducers token', {
    factory: () => ({
        [fromAuth.authFeatureKey]: fromAuth.reducer,
        [fromArticle.articlesFeatureKey]: fromArticle.reducer,
        [fromArticleComment.articleCommentsFeatureKey]: fromArticleComment.reducer,
        [fromArticleTag.articleTagsFeatureKey]: fromArticleTag.reducer,
        [fromUser.usersFeatureKey]: fromUser.reducer,
        [fromArticleReaction.articleReactionsFeatureKey]: fromArticleReaction.reducer,
    }),
});

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
