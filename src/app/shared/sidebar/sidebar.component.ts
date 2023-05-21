import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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
export class SidebarComponent {
  constructor(private authService: AuthService, private router: Router) {}

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
