import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { AuthService } from './auth.service';
import { IncomeExpense } from '../models/income-expense.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IncomeExpenseService {
  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService
  ) {}

  createIncomeExpense(incomeExpense: IncomeExpense) {
    const uid = this.authService.user?.uid;

    const { description, amount, type } = incomeExpense;

    return this.firestore
      .doc(`${uid}/income-expenses`)
      .collection('items')
      .add({ description, amount, type });
  }

  initializeIncomeExpenseListener(uid: string | undefined) {
    if (!uid) return;

    return this.firestore
      .collection(`${uid}/income-expenses/items`)
      .snapshotChanges()
      .pipe(
        map((snapshot: any) =>
          snapshot.map((doc: any) => ({
            uid: doc.payload.doc.id,
            ...(doc.payload.doc.data() as any),
          }))
        )
      )
  }

  deleteIncomeExpense(uidItem: string) {
    const uid = this.authService.user?.uid;
    return this.firestore.doc(`${uid}/income-expenses/items/${uidItem}`).delete();
  }
}
