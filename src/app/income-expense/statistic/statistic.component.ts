import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

//charjst
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { ChartConfiguration, ChartData, ChartEvent } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import { IncomeExpense } from './../../models/income-expense.model';
import { AppStateWithIncomeExpense } from '../income-expense.reducer';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styles: [
  ]
})
export class StatisticComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;


  income: number = 0;
  expense: number = 0;

  totalIncome: number = 0;
  totalExpense: number = 0;

  storeSubscription: Subscription = new Subscription();

   // Pie
   public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      datalabels: {
        formatter: (value, ctx) => {
          if (ctx.chart.data.labels) {
            return ctx.chart.data.labels[ctx.dataIndex];
          }
        },
      },
    }
  };
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: ['Income', 'Expense'],
    datasets: []
  };
  public pieChartPlugins = [ DatalabelsPlugin ];

   // events
   public chartClicked({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

  constructor(private store: Store<AppStateWithIncomeExpense>) { }

  ngOnInit(): void {
      this.storeSubscription = this.store.select('incomeExpense').subscribe(({items}) => this.createStatistics(items));
  }

  createStatistics(items: IncomeExpense[]){
    this.totalIncome = 0;
    this.totalExpense = 0;
    this.income = 0;
    this.expense = 0;

    
    items.forEach(item => {
      if(item.type === 'income'){
        this.totalIncome += item.amount;
        this.income++;
      }else{
        this.totalExpense += item.amount;
        this.expense++;
      }
    });

    this.pieChartData.datasets = [{
      data: [this.totalExpense, this.totalIncome,],
    }];

  }

}
