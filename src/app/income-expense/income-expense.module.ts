import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

//NGRX
import { StoreModule } from '@ngrx/store';
import * as incomeExpense  from './income-expense.reducer';

//ng2-charts
import { NgChartsModule } from 'ng2-charts';

import { OrderItemsPipe } from '../pipes/order-items.pipe';
import { DetailComponent } from './detail/detail.component';
import { IncomeExpenseComponent } from './income-expense.component';
import { StatisticComponent } from './statistic/statistic.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutesModule } from '../dashboard/dashboard-routes.module';



@NgModule({
  declarations: [
    DashboardComponent,
    StatisticComponent,
    IncomeExpenseComponent,
    DetailComponent,
    OrderItemsPipe,
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('incomeExpense', incomeExpense.reducer),
    ReactiveFormsModule,
    RouterModule,
    DashboardRoutesModule,
    SharedModule,
    NgChartsModule,
  ]
})
export class IncomeExpenseModule { }
