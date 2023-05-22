import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable, tap } from 'rxjs';

export const authGuard: CanActivateFn = (): Observable<boolean> => {
  const service = inject(AuthService);
  const router = inject(Router);

  return service.isAuthenticated().pipe(
    tap((state) => {
      if (!state) {
        router.navigate(['/login']);
      }
    })
  );
};
