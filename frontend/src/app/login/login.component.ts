import { Component } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = "";
  password: string = "";

  constructor(private authService: AuthenticationService, private router: Router) { }

  onSubmit() {
    const credentials = {
      username: this.username,
      password: this.password,
    }

    this.authService.login(credentials).subscribe(
      (response: any) => {
        this.router.navigate(['/']);
      },
      error => {
        console.error('Failed to login:', error);
      }
    )
  }
}
