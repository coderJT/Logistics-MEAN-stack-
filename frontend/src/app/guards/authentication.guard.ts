import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { inject } from '@angular/core';
import { map } from 'rxjs/operators';

/**
 * Guards the route if the user is not authenticated. If the user is authenticated, allows the route to be accessed.
 *
 * @returns {boolean} True if the user is authenticated, false otherwise.
 */
export const authenticationGuard: CanActivateFn = () => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);

  return authService.isLoggedIn().pipe(
    map(isLoggedIn => {
      if (isLoggedIn) {
        return true;
      } else {
        router.navigate(['/login']);
        return false;
      }
    })
  );
};
