import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PackageService } from '../package.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-delete-package',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './delete-package.component.html',
  styleUrl: './delete-package.component.css'
})
export class DeletePackageComponent {

  package = { _id: '' };

  constructor(private packageDB: PackageService, private router: Router) { } 


  deletePackage() {
    const packageId = this.package._id;
    if (packageId) {
     this.packageDB.removePackage(packageId).subscribe(
        (response: any) => {
          if (response.deletedCount > 0) {
            this.router.navigate(['/list_packages']);
          } else {
            this.router.navigate(['/invalid_data']);
          }
        },
        error => {
          this.router.navigate(['/invalid_data']);
        }
      );
    }
  }
}
