import { Component, OnInit } from '@angular/core';
import { DriverService } from '../driver.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-driver',
  templateUrl: './update-driver.component.html',
  standalone: true,
  imports: [FormsModule],
  styleUrls: ['./update-driver.component.css']
})
export class UpdateDriverComponent implements OnInit {
  drivers: any[] = [];
  selectedDriverId: string = "";
  driver: any = null;

  constructor(private driversDB: DriverService, private router: Router) {}

  ngOnInit(): void {
    this.driversDB.getDrivers().subscribe((response: any) => {
      for (let driver of response) {
        this.drivers.push(driver);
      }
    })
  }

  loadDriverDetails() {
    if (this.selectedDriverId) {
      this.driversDB.getDriverById(this.selectedDriverId).subscribe((data: any) => {
        this.driver = data; 
      });
    }
  }

  updateDriver() {
    const updatedDriver = {
      driver_department: this.driver.driver_department,
      driver_license: this.driver.driver_license
    };

    this.driversDB.updateDriver(this.selectedDriverId, updatedDriver).subscribe(response => {
      console.log('Driver updated successfully!', response);
      this.router.navigate(['list-drivers'])
    });
  }
}
