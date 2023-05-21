import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

//Rxjs
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import * as ui from '../../shared/ui.actions';

import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
    `
      i {
        color: #5cb85c;
      }
    `,
  ],
})
export class RegisterComponent implements OnInit, OnDestroy {
  formGroup: FormGroup = new FormGroup({});
  loading: boolean = false;
  uiSubscription: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private store: Store<AppState>,
    private router: Router
  ) {}

  ngOnInit(): void {
    //create form definitino
    this.formGroup = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.uiSubscription = this.store.select('ui').subscribe((ui) => this.loading = ui.isLoading);
  }

  ngOnDestroy(): void {
    //destroy store subscription
    this.uiSubscription.unsubscribe();
  }

  createUser() {
    if (this.formGroup.invalid) return;

    const { name, email, password } = this.formGroup.value;

    this.store.dispatch(ui.isLoading());
    // Swal.fire({
    //   title: 'Please wait',
    //   didOpen: () => {
    //     Swal.showLoading();
    //   },
    // });

    this.authService
      .createUser(name, email, password)
      .then((cred) => {
        console.log(cred);
        this.store.dispatch(ui.stopLoading());
        // Swal.close();
        this.router.navigate(['/']);
      })
      .catch((err) => {
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
