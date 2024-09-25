import { Component } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  username: string = "";
  password: string = "";
  confirmPassword: string = "";

  constructor(private authService: AuthenticationService, private router: Router) { }

  onSubmit() {
    if (this.password !== this.confirmPassword) { 
      console.error("Passwords do not match");  
    }

    const credentials = {
      username: this.username,
      password: this.password,
    }

    this.authService.signUp(credentials).subscribe(
      (response: any) => {
        this.router.navigate(['/login']);
      },
      error => {
        console.error('Failed to signup:', error);
      }
    )
  }
}
