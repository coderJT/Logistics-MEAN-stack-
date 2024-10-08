import { Component } from '@angular/core';
import { DriverService } from '../driver.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Driver } from '../models/driver';

@Component({
  selector: 'app-list-drivers-by-department',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './list-drivers-by-department.component.html',
  styleUrl: './list-drivers-by-department.component.css'
})

/**
 * This component is responsible for listing all drivers by their department.
 * 
 * This component uses the DriverService to retrieve drivers from the database and also
 * provides functionality to delete drivers.
 * 
 * @class ListDriversByDepartmentComponent
 */
export class ListDriversByDepartmentComponent {

  /**
   * The Driver array is used to store the drivers retrieved from the database.`
   */
  drivers: Driver[] = [];
  driver = { driver_department: "" }

  /**
   * Constructor that injects the DriverSevice and Router for handling driver-related operations 
   * and to navigate between routes.
   * @param driversDB 
   * @param router 
   */
  constructor(private driversDB: DriverService, private router: Router) { }

  /**
   * This method loads the drivers into the dirvers array from the database.
   * 
   * @returns {void}
   */
  loadDrivers(): void {
    this.drivers = []; // reset the drivers array to prevent unnecessary duplication
    if (this.driver.driver_department) {
      this.driversDB.getDriversByDepartment(this.driver.driver_department).subscribe((response: any) => {
        for (let driver of response) {
          this.drivers.push(driver);
        }
      })
    }
  }

/**
 * This method deletes a driver from the database based on the driver mongoose ID by calling
 * the removeDriver method of the DriverService.
 * 
 * @param driverId - ID of the driver to be deleted.
 * 
 * @returns {void}
 */
  onDelete(driverId: string): void {
    if (driverId) {
      this.driversDB.removeDriver(driverId).subscribe(
        (response: any) => {
          if (response.deletedCount > 0) {
            this.loadDrivers();
          } else {
            this.router.navigate(['invalid-data']);
          }
        },
        error => {
          console.error('Error removing driver:', error);
          this.router.navigate(['invalid-data']);
        }
      );
    }
  }
}
