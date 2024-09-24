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

  constructor(private driverDB: DriverService, private packageDB: PackageService) {}

  ngOnInit(): void {
    this.loadDrivers();
    this.loadPackages();
  }

  loadDrivers() {
    this.driverDB.getDrivers().subscribe(
      (response: any) => {
        this.drivers = response.drivers;
      },
      error => {
        console.error('Failed to load drivers:', error);
      }
    );
  }

  loadPackages() {
    this.packageDB.getPackages().subscribe(
      (response: any) => {
        this.packages = response.packages;
      },
      error => {
        console.error('Failed to load drivers:', error);
      }
    );
  }
}

