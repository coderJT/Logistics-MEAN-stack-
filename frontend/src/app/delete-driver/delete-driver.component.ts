import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DriverService } from '../driver.service';
import { Router } from '@angular/router';
import { Driver } from '../models/driver';

@Component({      
  selector: 'app-delete-driver',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './delete-driver.component.html',
  styleUrl: './delete-driver.component.css'
})
export class DeleteDriverComponent {

  driver = { _id: '' }; 
  drivers: any[] = [];

  constructor(private driversDB: DriverService, private router: Router) {}

  ngOnInit(): void {
    this.driversDB.getDrivers().subscribe((data: any) => {
      for (let driver of data) {
        this.drivers.push(driver);
      }
      console.log(this.drivers);
    })
  }

  deleteDriver() {
    if (this.driver._id) {
     this.driversDB.removeDriver(this.driver._id).subscribe(
        (response: any) => {
          if (response.deletedCount > 0) {
            this.router.navigate(['list-drivers']);
          } else {
            this.router.navigate(['invalid-data']);
          }
        },
        error => {
          console.error('Error removing driver:', error);
          this.router.navigate(['/invalid-data']);
        }
      );
    }
  }
}
