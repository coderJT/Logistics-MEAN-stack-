import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PackageService } from '../package.service';
import { Router } from "@angular/router";
import { Package } from '../models/package';

@Component({
  selector: 'app-delete-package',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './delete-package.component.html',
  styleUrl: './delete-package.component.css'
})

/**
 * This component is responsible for deleting a package from the database.
 * 
 * This components provides a form for the user to choose the package to be deleted.
 * After the form is submitted, the details are sent to the server to delete the package by
 * its mongoose ID.
 * 
 * @class DeletePackageComponent
 */
export class DeletePackageComponent {

  package = { _id: '' };
  packages: Package[] = [];

  /**
   * Constructor that injects the PackageService and Router for handling package-related operations
   * @param {PackageService} packagesDB 
   * @param {Router} router - Router for navigating to other routes after successful operations.
   */
  constructor(private packagesDB: PackageService, private router: Router) { }

  /**
   * Loads the packages from the database on initialization.
   * 
   * @returns {void}
   */
  ngOnInit(): void {
    this.packagesDB.getPackages().subscribe((data: any) => {
      this.packages = data;
    })
  }

  /**
   * Deletes a package from the database based on the package mongoose ID.
   * 
   * When the package is successfully deleted, the user is redirected to the 'list-packages' page.
   * If an error occurs, the error is logged to the console and the user is redirected to the 'invalid-data' page.
   * 
   * @returns {void}
   */
  deletePackage(): void {
    if (this.package._id) {
      this.packagesDB.removePackage(this.package._id).subscribe(
        (response: any) => {
          if (response.deletedCount > 0) {
            this.router.navigate(['list-packages']);
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
