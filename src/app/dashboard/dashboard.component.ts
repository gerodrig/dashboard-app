import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, filter } from 'rxjs';
import { AppState } from '../app.reducer';
import * as incomeExpenseActions from '../income-expense/income-expense.actions';

import { IncomeExpenseService } from '../services/income-expense.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [],
})
export class DashboardComponent implements OnInit, OnDestroy {
  authSubscription: Subscription = new Subscription();
  IncomeExpenseSubscription: Subscription = new Subscription();

  constructor(private store: Store<AppState>, private incomeExpenseService: IncomeExpenseService) {}

  ngOnInit(): void {
    this.authSubscription = this.store.select('auth').pipe(
      // tap(auth => console.log(auth))
      filter((auth) => auth.user != null)
    ).subscribe(({user}) => {
      
      this.IncomeExpenseSubscription = this.incomeExpenseService.initializeIncomeExpenseListener(user?.uid)!.subscribe(
        (incomeExpenses) => {
        this.store.dispatch(incomeExpenseActions.setItems({items: incomeExpenses}));
        }
      );


    });
  }

  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
    this.IncomeExpenseSubscription?.unsubscribe();
  }
}
