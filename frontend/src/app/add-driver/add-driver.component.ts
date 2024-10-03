import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DriverService } from '../driver.service';
import { Driver } from '../models/driver';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-driver',
  templateUrl: './add-driver.component.html',
  standalone: true,
  imports: [FormsModule],
  styleUrls: ['./add-driver.component.css']
})

/**
 * This component is responsible for adding a new driver to the database.
 * 
 * This component provides a form for the user to input details about the driver to be added. When the form
 * is submitted, the details are sent to the server to be added to the database. Upon successful addition, 
 * the user is navigated to the "list-drivers" page.
 * 
 * @class AddDriverComponent
 */
export class AddDriverComponent {

  /**
   * The Driver model is used to store details of the driver being added.
   * This object will be bound to the form input fields in the template.
   * 
   * @type {Driver}
   */
  driver: Driver = new Driver();

  /**
   * Constructor that injects the DriverService and Router for handling driver-related operations
   * and to navigate between routes.
   * 
   * @param {DriverService} driversDB - Service used to perform database operations on drivers.
   * @param {Router} router - Router for navigating to other routes after successful operations.
   */
  constructor(private driversDB: DriverService, private router: Router) { }

  /**
   * Adds the current driver to the database by calling driverDB's addDriver method.
   * 
   * When the driver is successfully added, it navigates the user to 'list-drivers' page.
   * If an error occurs, it navigates to the 'invalid-data' page and logs the error to the console.
   * 
   * @returns {void}
   */
  addDriver(): void {
    this.driversDB.addDriver(this.driver).subscribe(() => {
        this.router.navigate(['list-drivers']);
      },
      error => {
        this.router.navigate(['invalid-data']);
        console.error('Error adding driver:', error);
      }
    );
  }
}
