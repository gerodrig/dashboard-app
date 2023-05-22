import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

//NGRX
import { AppState } from 'src/app/app.reducer';
import * as ui from '../../shared/ui.actions';

import { AuthService } from 'src/app/services/auth.service';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
    `
      i {
        color: #5cb85c;
      }
    `,
  ],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup = new FormGroup({});
  loading: boolean = false;
  uiSubscription: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private store: Store<AppState>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.uiSubscription = this.store
      .select('ui')
      .subscribe((ui) => (this.loading = ui.isLoading));
  }

  ngOnDestroy(): void {
    //destroy store subscription
    this.uiSubscription.unsubscribe();
  }

  loginUser() {
    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.value;

    //trigger store action
    this.store.dispatch(ui.isLoading());

    // Swal.fire({
    //   title: 'Please wait',
    //   didOpen: () => {
    //     Swal.showLoading();
    //   },
    // });
    this.authService
      .loginUser(email, password)
      .then((cred) => {
        // console.log(cred);
        // Swal.close();
        //stop loading
        this.store.dispatch(ui.stopLoading());

        this.router.navigate(['/']);
      })
      .catch((err) => {
        //stop loading
        this.store.dispatch(ui.stopLoading());

        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Please check your email and password',
          confirmButtonColor: '#4083ff',
        });
      });
  }
}
