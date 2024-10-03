import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DriverService } from '../driver.service';
import { Router } from '@angular/router';
import { UppercasePipe } from '../pipes/uppercase.pipe';
import { Driver } from '../models/driver';

@Component({
  selector: 'app-list-drivers',
  standalone: true,
  imports: [FormsModule, UppercasePipe],
  templateUrl: './list-drivers.component.html',
  styleUrls: ['./list-drivers.component.css']
})

/**
 * This component is responsible for displaying the list of drivers.
 * 
 * This component provides user two options to either delete drivers or show packages assigned to them.
 * 
 * @class ListDriversComponent
 */
export class ListDriversComponent {

  /**
   * List of drivers.
   */
  drivers: Driver[] = [];

  /**
   * ID of the selected driver.
   */
  selectedDriverId: string | null = null;

  /**
   * Constructor that injects the DriverService and Router for handling driver-related operations and 
   * to navigate between routes.
   * 
   * @param {DriverService} driversDB - Service used to perform database operations on driver.
   * @param router - Router for navigating to other routes after successful operations.
   */
  constructor(private driversDB: DriverService, private router: Router) { }

  /**
   * Load drivers on initialization.
   * 
   * @returns {void}
   */
  ngOnInit(): void {
    this.loadDrivers();
  }

  /**
   * This method retrieves a list of drivers from the database using the driversDB service.
   * 
   * @returns {void}
   */
  loadDrivers(): void {
    this.drivers = [];
    this.driversDB.getDrivers().subscribe(
      (response: any) => {
        for (let driver of response) {
          this.drivers.push(driver);
        }
      },
      error => {
        console.error("Failed to load drivers:", error)
      }
    )
  }

  /**
   * This method deletes a driver from the database using the driversDB service.
   * 
   * @param driverId - ID of the driver to be deleted.
   * 
   * @returns {void}
   */
  deleteDriver(driverId: string): void {
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
          this.router.navigate(['invalid-data']);
        }
      );
    }
  }

  /**
   * This methods returns a comma-separated list of package IDs assigned to the selected driver.
   * 
   * @param packages - List of packages.
   * 
   * @returns List of packages assigned to the selected driver.
   */
  getAssignedPackageIds(packages: any[]): string {
    return packages.map(packageObj => packageObj._id).join(', ');
  }


  /**
   * This method toggles the visibility of the packages assigned to the selected driver. 
   * 
   * @param driverId - ID of the selected driver.
   * 
   * @returns {void}
   */
  showPackages(driverId: string): void {
    if (this.selectedDriverId === driverId) {
      this.selectedDriverId = null;
    } else {
      this.selectedDriverId = driverId;
    }
  }
}
