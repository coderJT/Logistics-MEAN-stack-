import { Component } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

/**
 * This component contains the navigation bar and the logout button.
 * 
 * @class HeaderComponent
 */
export class HeaderComponent {

  /**
   * Indicates whether the user is logged in or not.
   * 
   * @type {boolean}
   * @memberof HeaderComponent
   */
  userLoggedIn = false;

  /**
   * Subscription to the authentication service.
   */
  private authSubscription: Subscription;

  /**
   * Constructor that injects the AuthenticationService and Router for handling authentication-related
   * operations and to navigate between routes.
   * 
   * @param {AuthenticationService} authService - Service used to perform authentication tasks.
   * @param {Router} router - Router for navigating to other routes after successful operations.
   */
  constructor(private authService: AuthenticationService, private router: Router) { 
    this.authSubscription = this.authService.isLoggedIn().subscribe(loggedIn => {
      this.userLoggedIn = loggedIn;
    });
  }

  /**
   * Logs out the user and navigates to the login page.
   * 
   * @returns {void}
   */
  logout(): void {
    this.authService.logout().subscribe(() => {
      this.userLoggedIn = false;
      this.router.navigate(['/login']); 
    });
  }

  /**
   * Unsubscribes from the authentication subscription on component destroy.
   * 
   * @returns {void}
   */
  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}

