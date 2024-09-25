import { Component } from '@angular/core';
import { DriverService } from '../driver.service';
import { PackageService } from '../package.service';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  drivers: any[] = [];
  packages: any[] = [];

  constructor(private driversDB: DriverService, private packagesDB: PackageService) {}

  ngOnInit(): void {
    this.loadDrivers();
    this.loadPackages();
  }

  loadDrivers() {
    this.driversDB.getDrivers().subscribe(
      (response: any) => {
        for (let driver of response) {
          this.drivers.push(driver);
        }
      },
      error => {
        console.error('Failed to load drivers:', error);
      }
    );
  }

  loadPackages() {
    this.packagesDB.getPackages().subscribe(
      (response: any) => {
       for (let packageObj of response) {
         this.packages.push(packageObj);
       }
      },
      error => {
        console.error('Failed to load drivers:', error);
      }
    );
  }
}

