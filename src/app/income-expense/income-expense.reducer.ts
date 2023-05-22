import { type Action, createReducer, on } from '@ngrx/store';
import * as actions from './income-expense.actions';
import { IncomeExpense } from '../models/income-expense.model';

export interface State {
    items: IncomeExpense[];
}

export const IncomeExpenseInitialState: State = {
    items: [],
};

const _incomeExpenseReducer = createReducer(
    IncomeExpenseInitialState,
    on(actions.setItems, (state, { items }) => ({ ...state, items: [...items] })),
    on(actions.unSetItems, (state) => ({ ...state, items: [] }))
);

export function reducer(state: State | undefined , action: Action) {

    return _incomeExpenseReducer(state, action);

}