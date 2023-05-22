import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import Swal from 'sweetalert2';

import { IncomeExpenseService } from '../services/income-expense.service';

import { AppState } from '../app.reducer';
import * as uiactions from '../shared/ui.actions';
import { IncomeExpense } from '../models/income-expense.model';

type IncomeExpenses = 'income' | 'expense';

@Component({
  selector: 'app-income-expense',
  templateUrl: './income-expense.component.html',
  styles: [],
})
export class IncomeExpenseComponent implements OnInit, OnDestroy {
  incomeForm: FormGroup = new FormGroup({});
  type: IncomeExpenses = 'income';
  isLoading: boolean = false;
  uiSubscription: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private IncomeExpenseService: IncomeExpenseService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.incomeForm = this.fb.group({
      description: ['', Validators.required],
      //amount more than 0
      amount: ['', [Validators.required, Validators.min(0.1)]],
    });
    
    this.uiSubscription = this.store.select('ui').subscribe((ui) => (this.isLoading = ui.isLoading));
  }

  ngOnDestroy(): void {
    //destroy store subscription
    this.uiSubscription.unsubscribe();
  }


  toggleType() {
    this.type = this.type === 'income' ? 'expense' : 'income';
  }

  save() {
    this.store.dispatch(uiactions.isLoading());

    if (this.incomeForm.invalid) return;

    const { description, amount } = this.incomeForm.value;

    const entryToSave = new IncomeExpense(description, amount, this.type);

    this.IncomeExpenseService.createIncomeExpense(entryToSave)
      .then(() => {
        this.incomeForm.reset();
        Swal.fire({
          title: 'Entry created',
          text: description,
          icon: 'success',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#4083ff',
        });
        this.store.dispatch(uiactions.stopLoading());
      })
      .catch((err) => {
        this.store.dispatch(uiactions.stopLoading());
        Swal.fire({
          title: 'Error',
          text: err.message,
          icon: 'error',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#4083ff',
        });
      });
  }
}
