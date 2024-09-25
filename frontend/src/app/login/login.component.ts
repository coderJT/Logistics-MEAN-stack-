import { Component } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = "";
  password: string = "";

  constructor(private authService: AuthenticationService, private router: Router) { }

  onSubmit() {
    this.authService.login({username: this.username, password: this.password}).subscribe(
      (response) => {
        this.authService.setToken(response.token);
        this.router.navigate(['/']);
      },
      error => {
        console.error("Login failed", error);
      }
    )
  }
}
