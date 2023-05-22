import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

//NGRX
import { Store } from '@ngrx/store';
import { Subscription, filter } from 'rxjs';
import { AppState } from 'src/app/app.reducer';

import Swal from 'sweetalert2';

import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
    `
      .cursor {
        cursor: pointer;
      }
    `,
  ],
})
export class SidebarComponent implements OnInit, OnDestroy {
  user!: User;

  authSubscription: Subscription = new Subscription();

  constructor(private authService: AuthService, private router: Router, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.authSubscription = this.store.select('auth').pipe(
      filter(({ user }) => user !== null)
    ).subscribe(({ user }) => {
      this.user = user as User;
    }
    );
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  logout() {
    // console.log('logout');
    Swal.fire({
      title: 'Would you like to logout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#4083ff',
      confirmButtonText: 'Yes',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Please wait',
          didOpen: () => {
            Swal.showLoading();
          },
        });
        this.authService
          .logoutUser()
          .then(() => {
            Swal.close();
            this.router.navigate(['/login']);
          })
          .catch((err) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong, please try again later',
              confirmButtonColor: '#4083ff',
            });
          });
      }
    });
  }
}
