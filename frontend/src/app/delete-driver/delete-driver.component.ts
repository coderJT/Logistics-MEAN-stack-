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
  styleUrls: ['./delete-driver.component.css']
})

/**
 * This component is responsible for removing a driver from the database.
 * 
 * This component provides a form for the user to select the driver to be deleted.
 * Once the form is submitted, the information about the driver is used to identify the driver
 * to be deleted. Upon successful deletion, the user is redirected to the "list-drivers" page.
 * 
 * @class DeleteDriverComponent
 */
export class DeleteDriverComponent {

  /** Store the driver to be deleted */
  driver = { _id: '' };

  /** Store all drivers retrieved from the database */
  drivers: Driver[] = [];

  /**
   * Constructor that injects the DriverService and Router for handling driver-related opeations 
   * and to navigate between routes.
   * 
   * @param {DriverService} driversDB - Service used to perform database operations on driver.
   * @param {Router} router - Router for navigating to other routes after successful operations.
   */
  constructor(private driversDB: DriverService, private router: Router) { }

  /**
   * Called when the component is initialized. 
   * Retrieves all drivers from the database and stores them in the drivers database.
   * 
   * @returns {void}
   */
  ngOnInit(): void {
    this.driversDB.getDrivers().subscribe((data: any) => {
      for (let driver of data) {
        this.drivers.push(driver);
      }
    })
  }
  
  /**
  * Deletes a driver from the database based on the driver mongooose ID.
  * 
  * When the driver is successfully deleted, it navigates the user to 'list-drivers' page.
  * If an error occurs, it logs the error to the console and redirect user to invalid-data page.
  * 
  * @returns {void}
  */
  deleteDriver(): void {
    if (this.driver._id) {
      this.driversDB.removeDriver(this.driver._id).subscribe(
        (response: any) => {
          if (response.deletedCount > 0) {
            this.router.navigate(['list-drivers']);
          } else {
            this.router.navigate(['invalid-data']);
          }
        },
        error => {
          console.error('Error removing driver:', error);
        }
      );
    }
  }
}
