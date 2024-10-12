import { Component } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

/**
 * This is the login component that provides an interface for user to login and be authenticated.
 * 
 * @component LoginComponent
 */
export class LoginComponent {
  username: string = "";
  password: string = "";
  invalidCredentials: boolean = false;

  /**
   * 
   * Constructor that injects the authService, and Router services for handling
   * authentication-related operations and to navigate between routes.
   * 
   * @param authService - Service used to perform authentication tasks.
   * @param router - Router for navigating to other routes after successful operations.
   */
  constructor(private authService: AuthenticationService, private router: Router) { }

  /**
   * Logs in the user and navigates to the home page.
   * 
   * @returns {void}
   */
  onSubmit(): void {
    this.invalidCredentials = false;
    this.authService.login({username: this.username, password: this.password}).subscribe(
      (response) => {
        this.authService.setToken(response.token);
        this.router.navigate(['/']);
      },
      error => {
        console.error("Login failed", error);
        this.invalidCredentials = true;
      }
    )
  }
}
