import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUser from './user.reducer';
import { Dictionary } from '@ngrx/entity';
import { User } from './user.model';

export const getArticleTagsState = createFeatureSelector<fromUser.State>(fromUser.usersFeatureKey);

export const selectUserEntities = createSelector(getArticleTagsState, fromUser.selectEntities);

export const selectAllUsers = createSelector(getArticleTagsState, fromUser.selectAll);

export const selectUserById = createSelector(
    selectUserEntities,
    (usersDictionary: Dictionary<User>, { userId }) => usersDictionary && userId ? usersDictionary[userId] : null
);
