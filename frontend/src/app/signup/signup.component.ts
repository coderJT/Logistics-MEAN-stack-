import { Component } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, RouterLink], 
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'] 
})
export class SignupComponent {
  username: string = "";
  password: string = "";
  confirmPassword: string = "";
  usernameExists: boolean = false;

  constructor(private authService: AuthenticationService, private router: Router) { }

  onSubmit() {
    this.usernameExists = false;
    if (this.password !== this.confirmPassword) {
      return;  
    }

    const credentials = {
      username: this.username,
      password: this.password,
      confirmPassword: this.confirmPassword
    };

    this.authService.signUp(credentials).subscribe(
      (response: any) => {
        console.log('Signup successful');
        this.router.navigate(['/login']);
      },
      error => {
        console.error('Failed to signup:', error);
        this.usernameExists = true;
      }
    );
  }
}
