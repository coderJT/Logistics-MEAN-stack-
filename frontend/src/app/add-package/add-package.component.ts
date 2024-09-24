import { Component } from '@angular/core';
import { FormsModule } from "@angular/forms";
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

  constructor(private packages: PackageService, private router: Router) { }

  addPackage() {
    this.packages.addPackage(this.package).subscribe(() => {
      this.router.navigate(['/packages']);
    });
  }
}
