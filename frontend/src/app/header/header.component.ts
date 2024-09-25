import { Component } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {
  userLoggedIn = false;

  constructor(private authService: AuthenticationService, private router: Router) { 
    this.userLoggedIn = this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.userLoggedIn = false;
      this.router.navigate(['/login']); 
    });
  }
}