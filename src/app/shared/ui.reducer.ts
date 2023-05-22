import { createReducer, on, type Action } from '@ngrx/store';
import * as actions from './ui.actions';


export interface State {
    isLoading: boolean;
    stopLoading: boolean;
}

export const initialState: State = {
    isLoading: false,
    stopLoading: false
}

const _uiReducer = createReducer(initialState,
    on(actions.isLoading, state => ({ ...state, isLoading: true })),
    on(actions.stopLoading, state => ({ ...state, isLoading: false }))
);

export function reducer(state: State | undefined, action: Action) {
    return _uiReducer(state, action);
}