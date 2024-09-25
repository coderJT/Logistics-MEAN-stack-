import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DriverService } from '../driver.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-drivers',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './list-drivers.component.html',
  styleUrls: ['./list-drivers.component.css']
})
export class ListDriversComponent implements OnInit {
  drivers: any[] = [];

  constructor(private driversDB: DriverService, private router: Router) {}

  ngOnInit(): void {
    this.loadDrivers();
  }

  loadDrivers() {
    this.driversDB.getDrivers().subscribe(
      (response: any) => {
        for (let driver of response) {
          this.drivers.push(driver);
          console.log(this.drivers)
        }
        console.log(response);
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
            this.router.navigate(['invalid_data']);
          }
        },
        error => {
          this.router.navigate(['invalid_data']);
        }
      );
    }
  }
}
