import { Pipe, PipeTransform } from '@angular/core';
import { IncomeExpense } from '../models/income-expense.model';

@Pipe({
  name: 'orderItems'
})
export class OrderItemsPipe implements PipeTransform {

  transform(items: IncomeExpense[]): IncomeExpense[] {
    const array = [...items];

    return array.sort((a, b) => {
      if (a.type === 'income') {
        return -1;
      } else {
        return 1;
      }
    });

  }

}
