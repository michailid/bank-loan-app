import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const local = localStorage.getItem('bankUser');
  if (local != null) {
    const loggedUser = JSON.parse(local);
    if (loggedUser) {
      return true;
    }
  }

  // not logged in -> redirect to register page
  router.navigate(['/register']);
  return false;
};
