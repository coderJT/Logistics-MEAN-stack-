import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PackageService } from '../package.service';
import { Router } from "@angular/router";
import { Package } from '../models/package';

@Component({
  selector: 'app-delete-package',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './delete-package.component.html',
  styleUrl: './delete-package.component.css'
})
export class DeletePackageComponent {

  package = { _id: '' };
  packages: Package[] = [];

  constructor(private packagesDB: PackageService, private router: Router) { } 

  ngOnInit(): void {
    this.packagesDB.getPackages().subscribe((data: any) => {
      this.packages = data;
    })
  }

  deletePackage() {
    if (this.package._id) {
     this.packagesDB.removePackage(this.package._id).subscribe(
        (response: any) => {
          if (response.deletedCount > 0) {
            this.router.navigate(['list-packages']);
          } else {
            this.router.navigate(['invalid-data']);
          }
        },
        error => {
          console.error('Error removing driver:', error);
          this.router.navigate(['invalid-data']);
        }
      );
    }
  }
}
