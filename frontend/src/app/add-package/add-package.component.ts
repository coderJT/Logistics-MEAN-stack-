import { Component } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { DriverService } from '../driver.service';
import { PackageService } from '../package.service';
import { Router } from "@angular/router";
import { Package } from '../models/package';

@Component({
  selector: 'app-add-package',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-package.component.html',
  styleUrl: './add-package.component.css'
})

/**
 * This component is responsible for adding a new package to the database.
 * 
 * This component provides a form for the user to input details about the package to be added. When the form 
 * is submitted, the details are sent to the server to be added to the databsase. Upon successful addition, 
 * the user is navigated to the "list-packages" page.
 * 
 * @class AddPackageComponent
 */
export class AddPackageComponent {

  /**
   * The Package model is used to store details of the package being added.
   * This object will be bound to the form input fields in the template.
   * 
   * @type {Package}
   */
  package: Package = new Package();


  drivers: any[] = [];

  /**
   * Constructor that injects the DriverService, PackageService and Router for handling package-related operations
   * and to navigate between routes.
   * 
   * @param {DriverService} driversDB - Service used to perform database operations on drivers.
   * @param {PackageService} packagesDB - Service used to perform database operations on packages. 
   * @param {Router} router - Router for navigating to other routes after successful operations.
   */
  constructor(private driversDB: DriverService, private packagesDB: PackageService, private router: Router) { }

  /**
   * Executed when the component is initialized.
   * It calls getDrivers method of driversDB service to return a list of drivers.
   * 
   * @returns {void}
   */
  ngOnInit(): void {
    this.driversDB.getDrivers().subscribe((response: any) => {
      for (let driver of response) {
        this.drivers.push(driver);
      }
      console.log(this.drivers);
    })
  }

  /**
   * Adds the current package to the database by calling the packageDB's addPackage method.
   * 
   * When the package is successfully added, it navigates the user to 'list-packages' page.
   * If an error occurs, it logs the error to the console.
   */
  addPackage(): void {
    this.packagesDB.addPackage(this.package).subscribe(() => {
      this.router.navigate(['list-packages']);
    },
    error => {
      console.error('Error adding package:', error);
    })
  }
}
