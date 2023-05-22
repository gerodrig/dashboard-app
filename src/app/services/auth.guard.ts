import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable, take, tap } from 'rxjs';

export const AuthGuard: CanMatchFn = (): Observable<boolean> => {
  const service = inject(AuthService);
  const router = inject(Router);

  return service.isAuthenticated().pipe(
    tap((state) => {
      if (!state) {
        router.navigate(['/login']);
      }
    }),
    take(1)
  );
};
