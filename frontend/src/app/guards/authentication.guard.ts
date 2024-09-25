import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { inject } from '@angular/core';
import { Observable, of } from 'rxjs';

export const authenticationGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return of(true);
  } else {
    router.navigate(['/login']);
    return of(false);
  }
};
