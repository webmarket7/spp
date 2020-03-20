import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuth from './auth.reducer';

export const selectAuthState = createFeatureSelector<fromAuth.State>(
  fromAuth.authFeatureKey
);

export const selectAuthenticated = createSelector(
    selectAuthState,
    (state: fromAuth.State) => state.authenticated
);

export const selectAuthToken = createSelector(
    selectAuthState,
    state => state.token
);

export const selectCurrentUser = createSelector(
    selectAuthState,
    state => state.currentUser
);
