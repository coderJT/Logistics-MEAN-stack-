import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DriverService } from '../driver.service';
import { Router } from '@angular/router';
import { Driver } from '../models/driver';

@Component({      
  selector: 'app-delete-driver',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './delete-driver.component.html',
  styleUrl: './delete-driver.component.css'
})
export class DeleteDriverComponent {

  driver = { _id: '' }; 
  drivers: Driver[] = [];

  constructor(private driversDB: DriverService, private router: Router) {}

  ngOnInit(): void {
    this.driversDB.getDrivers().subscribe((data: any) => {
      this.drivers = data;
    })
  }

  deleteDriver() {
    if (this.driver._id) {
     this.driversDB.removeDriver(this.driver._id).subscribe(
        (response: any) => {
          if (response.deletedCount > 0) {
            this.router.navigate(['list_drivers']);
          } else {
            this.router.navigate(['invalid_data']);
          }
        },
        error => {
          this.router.navigate(['/invalid_data']);
        }
      );
    }
  }
}
