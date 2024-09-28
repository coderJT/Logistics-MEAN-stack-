import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PackageService } from '../package.service'; 
import { DriverService } from '../driver.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-packages',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './list-packages.component.html',
  styleUrls: ['./list-packages.component.css']
})

export class ListPackagesComponent implements OnInit {
  packages: any[] = [];
  selectedPackageId: string | null = null;
  selectedDriverId: string | null = null;
  driver: any = null;

  constructor(
    private driverService: DriverService,
    private packageService: PackageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadPackages();
  }

  loadPackages() {
    this.packageService.getPackages().subscribe(
      (response: any) => {
        this.packages = response;
      },
      (error) => {
        console.error('Failed to load packages:', error);
      }
    );
  }

  deletePackage(packageId: string) {
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

  showDriver(packageId: string, driverId: string) {
    if (this.selectedPackageId === packageId) {

      this.selectedPackageId = null;
      this.selectedDriverId = null;
      this.driver = null;
    } else {
      // Set selected package and driver
      this.selectedPackageId = packageId;
      this.selectedDriverId = driverId;

      // Fetch driver details
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
