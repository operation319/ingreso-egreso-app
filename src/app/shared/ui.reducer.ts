import { createReducer, on } from '@ngrx/store';
import { isLoading, stopLoading } from './ui.actions';

export interface State {
    isLoading: boolean;
}

export const initialState: State = {
   isLoading: false,
};

// tslint:disable-next-line: variable-name
const _uiReducer = createReducer(initialState,

    on(isLoading,   state => ({ ...state, isLoading: true  })),
    on(stopLoading, state => ({ ...state, isLoading: false })),

);

export function uiReducer(state, action): any {
    return _uiReducer(state, action);
}
