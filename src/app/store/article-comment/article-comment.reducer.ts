import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { ArticleComment } from './article-comment.model';
import * as ArticleCommentActions from './article-comment.actions';

export const articleCommentsFeatureKey = 'articleComments';

export interface State extends EntityState<ArticleComment> {}

export const adapter: EntityAdapter<ArticleComment> = createEntityAdapter<ArticleComment>({
    selectId: (comment) => comment._id
});

export const initialState: State = adapter.getInitialState({});

const articleCommentReducer = createReducer(
    initialState,
    on(ArticleCommentActions.addArticleComment,
        (state, action) => adapter.addOne(action.articleComment, state)
    ),
    on(ArticleCommentActions.upsertArticleComment,
        (state, action) => adapter.upsertOne(action.articleComment, state)
    ),
    on(ArticleCommentActions.addArticleComments,
        (state, action) => adapter.addMany(action.articleComments, state)
    ),
    on(ArticleCommentActions.upsertArticleComments,
        (state, action) => adapter.upsertMany(action.articleComments, state)
    ),
    on(ArticleCommentActions.updateArticleComment,
        (state, action) => adapter.updateOne(action.articleComment, state)
    ),
    on(ArticleCommentActions.updateArticleComments,
        (state, action) => adapter.updateMany(action.articleComments, state)
    ),
    on(ArticleCommentActions.deleteArticleComment,
        (state, action) => adapter.removeOne(action.id, state)
    ),
    on(ArticleCommentActions.deleteArticleComments,
        (state, action) => adapter.removeMany(action.ids, state)
    ),
    on(ArticleCommentActions.loadArticleComments,
        (state, action) => adapter.addAll(action.articleComments, state)
    ),
    on(ArticleCommentActions.clearArticleComments,
        state => adapter.removeAll(state)
    ),
);

export function reducer(state: State | undefined, action: Action) {
    return articleCommentReducer(state, action);
}

export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
} = adapter.getSelectors();
