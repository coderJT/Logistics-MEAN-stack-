import { Component } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { DriverService } from '../driver.service';
import { PackageService } from '../package.service';
import { Router } from "@angular/router";
import { Package } from '../models/package';

@Component({
  selector: 'app-add-package',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-package.component.html',
  styleUrl: './add-package.component.css'
})
export class AddPackageComponent {

  package: Package = new Package();
  drivers: any[] = [];

  constructor(private driverDB: DriverService, private packageDB: PackageService, private router: Router) { }

  ngOnInit(): void {
    this.loadDrivers(); 
  }

  loadDrivers() {
    this.driverDB.getDrivers().subscribe((data: any) => {
      this.drivers = data;
    }, (error) => {
      console.error('Error fetching drivers', error);
    });
  }


  addPackage() {
    this.packageDB.addPackage(this.package).subscribe(() => {
      this.router.navigate(['/packages']);
    });
  }

}
