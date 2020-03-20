import { Action, createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { AuthData } from '../../auth/models/auth-data.model';
import { User } from '../user/user.model';
import { omit } from 'lodash';


export const authFeatureKey = 'auth';

export interface State {
    authenticated: boolean;
    token: string;
    currentUser: User;
}

export const initialState: State = {
    authenticated: false,
    token: null,
    currentUser: null
};

const authReducer = createReducer(
    initialState,
    on(AuthActions.signInSuccess, (state, { authData }: {authData: Partial<AuthData>}) => ({
        ...state,
        authenticated: true,
        currentUser: omit(authData, 'token'),
        token: authData.token
    })),
    on(AuthActions.signOutSuccess, (state) => ({
        ...state,
        authenticated: false,
        token: null
    })),
    on(AuthActions.loadCurrentUserSuccess, (state, { user }) => ({
        ...state,
        currentUser: user
    }))
);

export function reducer(state: State | undefined, action: Action) {
    return authReducer(state, action);
}
