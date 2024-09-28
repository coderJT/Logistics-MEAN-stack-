import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DriverService } from '../driver.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-drivers',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './list-drivers.component.html',
  styleUrls: ['./list-drivers.component.css']
})
export class ListDriversComponent implements OnInit {
  drivers: any[] = [];
  selectedDriverId: string | null = null; 

  constructor(private driversDB: DriverService, private router: Router) {}

  ngOnInit(): void {
    this.loadDrivers();
  }

  loadDrivers() {
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

  deleteDriver(driverId: string) {
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

  getAssignedPackageIds(packages: any[]): string {
    return packages.map(packageObj => packageObj._id).join(', ');
  }
  
  showPackages(driverId: string) {
    if (this.selectedDriverId === driverId) {
      this.selectedDriverId = null; 
    } else {
      this.selectedDriverId = driverId; 
    }
  }
}
