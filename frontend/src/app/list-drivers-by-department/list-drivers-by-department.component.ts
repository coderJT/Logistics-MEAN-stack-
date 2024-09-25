import { Component } from '@angular/core';
import { DriverService } from '../driver.service';
import { Driver } from '../models/driver';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-drivers-by-department',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './list-drivers-by-department.component.html',
  styleUrl: './list-drivers-by-department.component.css'
})
export class ListDriversByDepartmentComponent {

  drivers: Driver[] = [];
  driver = { driver_department: "" }

  constructor(private driversDB: DriverService, private router: Router) { }


  loadDrivers() {
    if (this.driver.driver_department) {
      this.driversDB.getDriversByDepartment(this.driver.driver_department).subscribe((response: any) => {
        this.drivers = response.drivers;
      })
    }
  }

  onDelete(driverId: string) {
    if (driverId) {
      this.driversDB.removeDriver(driverId).subscribe(
        (response: any) => {
          if (response.deletedCount > 0) {
            this.loadDrivers();
          } else {
            this.router.navigate(['invalid_data']);
          }
        },
        error => {
          this.router.navigate(['invalid_data']);
        }
      );
    }
  }
}
