import { Component } from '@angular/core';
import { PackageService } from '../package.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-package',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-package.component.html',
  styleUrl: './update-package.component.css'
})
export class UpdatePackageComponent {
  packages: any[] = [];
  selectedPackageId: string = "";
  package: any = null;

  constructor(private packagesDB: PackageService, private router: Router) { }

  ngOnInit(): void {
    this.packagesDB.getPackages().subscribe(
      (response: any) => {
        for (let packageObj of response) {
          this.packages.push(packageObj);
        }
      }
    )
  }

  loadPackageDetails() {
    if (this.selectedPackageId) {
      this.packagesDB.getPackageById(this.selectedPackageId).subscribe((data: any) => {
        this.package = data;
      })
    }
  }

  updatePackage() {
    const updatedPackage = {
      package_destination: this.package.package_destination,
    };

    this.packagesDB.updatePackage(this.selectedPackageId, updatedPackage).subscribe(response => {
      console.log('Package updated successfully!', response);
      this.router.navigate(['list-packages'])
    })

  }
}
