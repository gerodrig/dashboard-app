import { Component, OnDestroy, OnInit } from '@angular/core';

//NGRX
import { Store } from '@ngrx/store';
import { Subscription, filter } from 'rxjs';
import { AppState } from 'src/app/app.reducer';

import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [],
})
export class NavbarComponent implements OnInit, OnDestroy {
  user!: User;
  storeSubscription: Subscription = new Subscription();

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.storeSubscription = this.store
      .select('auth')
      .pipe(filter(({ user }) => user !== null))
      .subscribe(({ user }) => (this.user = user as User ));
  }

  ngOnDestroy(): void {
    this.storeSubscription.unsubscribe();
  }
}
