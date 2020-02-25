import { createAction, props } from '@ngrx/store';
import { Credentials } from '../../auth/models/credentials.model';
import { AuthData } from '../../auth/models/auth-data.model';
import { User } from '../user/user.model';


export const signIn = createAction(
    '[Auth] Sign user in',
    props<{ credentials: Credentials, redirectTo?: string }>()
);

export const signInSuccess = createAction(
    '[Auth] User successfully signed in',
    props<{ authData: Partial<AuthData>, redirectTo?: string }>()
);

export const signInFailure = createAction(
    '[Auth] Failed to sign in user',
    props<{ error: any }>()
);

export const signUp = createAction(
    '[Auth] Sign up new user',
    props<{ credentials: Credentials }>()
);

export const signUpFailure = createAction(
    '[Auth] Failed to sign up new user',
    props<{ error: any }>()
);

export const signOut = createAction(
    '[Auth] Sign out'
);

export const signOutSuccess = createAction(
    '[Auth] User successfully signed out'
);

export const signOutFailure = createAction(
    '[Auth] Failed to sign out user'
);

export const loadCurrentUser = createAction(
    '[Auth] Load Current User'
);

export const loadCurrentUserSuccess = createAction(
    '[Auth] Load Current User Success',
    props<{ user: User }>()
);

export const loadCurrentUserFailure = createAction(
    '[Auth] Load Current User Failure',
    props<{ error: any }>()
);
