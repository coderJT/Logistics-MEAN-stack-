import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DriverService } from '../driver.service';
import { Router } from '@angular/router';
import { Driver } from '../models/driver';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-add-driver',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './add-driver.component.html',
  styleUrl: './add-driver.component.css'
})
export class AddDriverComponent {

  driver: Driver = new Driver();

  constructor(private drivers: DriverService, private router: Router) {}

  addDriver() {
    this.drivers.addDriver(this.driver);
    this.router.navigate(['/drivers']);
  }
}
