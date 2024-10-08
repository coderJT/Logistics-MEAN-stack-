import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PackageService } from '../package.service'; 
import { DriverService } from '../driver.service';
import { Router } from '@angular/router';
import { GramPipe } from '../pipes/gram.pipe';
import { Package } from '../models/package';

@Component({
  selector: 'app-list-packages',
  standalone: true,
  imports: [FormsModule, GramPipe],
  templateUrl: './list-packages.component.html',
  styleUrls: ['./list-packages.component.css']
})

/**
 * This component is responsible for listing all the packages in the database.
 * 
 * This component implements the OnInit interface, which is used to load the packages on initialization.
 * User can also delete the selected package or show the assigned driver.
 * 
 * @class ListPackagesComponent
 */
export class ListPackagesComponent implements OnInit {
  packages: Package[] = [];
  selectedPackageId: string | null = null;
  selectedDriverId: string | null = null;
  driver: any = null;

  /**
   * Constructor that injects the DriverService, PackageService, and Router services for handling
   * driver-related operations, handling package-related operations and to navigate between routes.
   * 
   * @param {DriverService} driverService - Service used to perform database operations on drivers.
   * @param {PackageService} packageService  - Service used to perform database operations on packages.
   * @param {Router} router - Router for navigating to other routes after successful operations.
   */
  constructor(
    private driverService: DriverService,
    private packageService: PackageService,
    private router: Router
  ) {}

  /**
   * Load the packages on initialization.
   * 
   * @returns {void}
   */
  ngOnInit(): void {
    this.loadPackages();
  }

  /**
   * This method loads the packages from the database.
   * 
   * @returns {void}
   */
  loadPackages(): void {
    this.packageService.getPackages().subscribe(
      (response: any) => {
        this.packages = response;
      },
      (error) => {
        console.error('Failed to load packages:', error);
      }
    );
  }

  /**
   * 
   * This method deletes the package from the database based on the package ID.
   * 
   * @param packageId - The ID of the package to be deleted.
   * 
   * @returns {void}
   */
  deletePackage(packageId: string): void {
    if (packageId) {
      this.packageService.removePackage(packageId).subscribe(
        (response: any) => {
          if (response.deletedCount > 0) {
            this.loadPackages();
          } else {
            this.router.navigate(['/invalid-data']);
          }
        },
        (error) => {
          console.error('Failed to delete package:', error);
          this.router.navigate(['/invalid-data']);
        }
      );
    }
  }

  /**
   * This method shows the details of the associated driver of a package.
   * 
   * @param packageId - The ID of the package to be shown.
   * @param driverId - The ID of the driver to be shown.
   * 
   * @returns {void}
   */
  showDriver(packageId: string, driverId: string): void {
    if (this.selectedPackageId === packageId) {

      this.selectedPackageId = null;
      this.selectedDriverId = null;
      this.driver = null;
    } else {
      this.selectedPackageId = packageId;
      this.selectedDriverId = driverId;

      this.driverService.getDriverById(driverId).subscribe(
        (response: any) => {
          this.driver = response;
        },
        (error) => {
          console.error('Failed to load driver:', error);
        }
      );
    }
  }
}
