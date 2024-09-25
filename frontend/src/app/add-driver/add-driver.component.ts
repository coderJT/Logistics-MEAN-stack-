import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DriverService } from '../driver.service';
import { Router } from '@angular/router';
import { Driver } from '../models/driver';

@Component({
  selector: 'app-add-driver',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-driver.component.html',
  styleUrl: './add-driver.component.css'
})
export class AddDriverComponent {

  driver: Driver = new Driver();

  constructor(private driversDB: DriverService, private router: Router) {}

  addDriver() {
    this.driversDB.addDriver(this.driver);
    this.router.navigate(['list_drivers']);
  }
}
