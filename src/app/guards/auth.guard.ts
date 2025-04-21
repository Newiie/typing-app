import { CanActivateFn, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const protectedRoutes = ['/', '/result'];
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  return protectedRoutes.includes(state.url) && !isLoggedIn
    ? (router.navigate(['/login']), false)
    : true;
};
