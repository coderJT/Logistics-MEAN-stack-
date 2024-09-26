import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DriverService } from '../driver.service';
import { Driver } from '../models/driver';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-driver',
  templateUrl: './add-driver.component.html',
  standalone: true,
  imports: [FormsModule],
  styleUrls: ['./add-driver.component.css']
})
export class AddDriverComponent {

  driver: Driver = new Driver();

  constructor(private driversDB: DriverService, private router: Router) {}

  addDriver() {
    this.driversDB.addDriver(this.driver).subscribe(
      response => {
        console.log('Driver added successfully', response);
        this.router.navigate(['list-drivers']);
      },
      error => {
        console.error('Error adding driver:', error);
      }
    );
  }
}
