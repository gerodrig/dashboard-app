import { createAction, props } from '@ngrx/store';
import { IncomeExpense } from '../models/income-expense.model';

export const setItems = createAction('[Income Expense] Set Items',
  props<{ items: IncomeExpense[] }>());
export const unSetItems = createAction('[Income Expense] Unset Items');