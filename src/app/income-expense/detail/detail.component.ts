import { IncomeExpenseService } from './../../services/income-expense.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

//NGRX
import { Store } from '@ngrx/store';

import { IncomeExpense } from '../../models/income-expense.model';
import { AppState } from 'src/app/app.reducer';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styles: [],
})
export class DetailComponent implements OnInit {
  incomeExpense: IncomeExpense[] = [];
  storeSubscription: Subscription = new Subscription();

  constructor(
    private store: Store<AppState>,
    private incomeExpenseService: IncomeExpenseService
  ) {}

  ngOnInit(): void {
    this.storeSubscription = this.store
      .select('incomeExpense')
      .subscribe(({ items }) => (this.incomeExpense = items));
  }

  ngOnDestroy(): void {
    this.storeSubscription.unsubscribe();
  }

  delete(uid: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Entry will be deleted permanently',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.incomeExpenseService
          .deleteIncomeExpense(uid)
          .then(() => {
            Swal.fire({
              title: 'Deleted!',
              text: 'Entry has been deleted.',
              icon: 'success',
              confirmButtonColor: '#3085d6',
            });
          })
          .catch((err) => {
            Swal.fire({
              title: 'Error!',
              text: err.message,
              icon: 'error',
              confirmButtonColor: '#3085d6',
            });
          });
      }
    });
  }
}
