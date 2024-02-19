import { AuthService } from '@/app/layouts/auth/auth-service.service';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  if (authService.isLoggedIn()) {
    return true;
  }

  // Redirect to sign in page
  return router.navigate(['/auth', 'login']);
};

export const blockAuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  return true;
  // return true;

  // if (authService.isLoggedIn()) {
  //   return router.navigate(['/dashboard', authService.getAuthorizationToken()]);
  // }

  // // Redirect to sign in page
  // return router.navigate(['/auth', 'login']);
};
