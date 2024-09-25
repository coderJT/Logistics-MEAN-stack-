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

  constructor(private driversDB: DriverService, private packagesDB: PackageService, private router: Router) { }

  ngOnInit(): void {
    this.driversDB.getDrivers().subscribe((data: any) => {
      this.drivers = data;
    })
  }

  addPackage() {
    this.packagesDB.addPackage(this.package).subscribe(() => {
      this.router.navigate(['list-packages']);
    });
  }

}
