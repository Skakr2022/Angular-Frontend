import { inject } from '@angular/core';
import { CanActivateFn, Route, Router } from '@angular/router';
import { TokenStorageService } from './token-storage.service';

export const authGuardGuard: CanActivateFn
    = (route , state) => {
      const tokenStorage = inject(TokenStorageService);
      const router = inject(Router);
      if (tokenStorage.isLoggedIn() !== true) {
        window.alert('Access Denied, Login is Required to Access This Page!');
        router.navigate(['login']);
        return false;
      }
  return true;
};

export const loginGuard: CanActivateFn
    = (route , state) => {
      const tokenStorage = inject(TokenStorageService);
      const router = inject(Router);
      if (tokenStorage.isLoggedIn() === true) {
        router.navigate(['dashboardpage']);
        return false;
      }
  return true;
};
