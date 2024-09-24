import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DriverService } from '../driver.service';
import { Router } from '@angular/router';

@Component({      
  selector: 'app-delete-driver',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './delete-driver.component.html',
  styleUrl: './delete-driver.component.css'
})
export class DeleteDriverComponent {

  driver = { _id: '' }; 

  constructor(private driverDB: DriverService, private router: Router) {}

  deleteDriver() {
    const driverId = this.driver._id;
    if (driverId) {
     this.driverDB.removeDriver(driverId).subscribe(
        (response: any) => {
          if (response.deletedCount > 0) {
            this.router.navigate(['/list_drivers']);
          } else {
            this.router.navigate(['/invalid_data']);
          }
        },
        error => {
          this.router.navigate(['/invalid_data']);
        }
      );
    }
  }
}
