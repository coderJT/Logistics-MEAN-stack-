import { Component, OnDestroy } from '@angular/core';
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

export class HeaderComponent implements OnDestroy {

  userLoggedIn = false;
  private authSubscription: Subscription;

  constructor(private authService: AuthenticationService, private router: Router) { 
    this.authSubscription = this.authService.isLoggedIn().subscribe(loggedIn => {
      this.userLoggedIn = loggedIn;
    });
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.userLoggedIn = false;
      this.router.navigate(['/login']); 
    });
  }

  ngOnDestroy() {
    // Unsubscribe to avoid memory leaks
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}

