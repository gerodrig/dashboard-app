import { type Action, createReducer, on } from '@ngrx/store';
import * as actions from './auth.actions';
import { User } from '../models/user.model';

export interface State {
    user: User | null;
}

export const AuthInitialState: State = {
    user: null
}

const _authReducer = createReducer(AuthInitialState,
    on(actions.setUser, (state, { user }) => ({ ...state, user: { ...user } })),
    on(actions.unSetUser, state => ({ ...state, user: null }))
);


export function reducer(state: State | undefined, action: Action) {
    return _authReducer(state, action);
}
