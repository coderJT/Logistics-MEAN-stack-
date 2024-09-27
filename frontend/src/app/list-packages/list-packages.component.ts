import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PackageService } from '../package.service'; // Ensure this service exists
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-packages',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './list-packages.component.html',
  styleUrls: ['./list-packages.component.css']
})
export class ListPackagesComponent implements OnInit {
  packages: any[] = [];

  constructor(private packageService: PackageService, private router: Router) {}

  ngOnInit(): void {
    this.loadPackages();
  }

  loadPackages() {
    this.packages = [];
    this.packageService.getPackages().subscribe(
      (response: any) => {
        for (let packageObj of response) {
          this.packages.push(packageObj);
        }
      },
      error => {
        console.error('Failed to load packages:', error);
      }
    );
  }

  deletePackage(packageId: string) {
    if (packageId) {
      this.packageService.removePackage(packageId).subscribe(
        (response: any) => {
          if (response.deletedCount > 0) {
            this.loadPackages();
          } else {
            this.router.navigate(['/invalid-data']);
          }
        },
        error => {
          console.error('Failed to delete package:', error);
          this.router.navigate(['/invalid-data']);
        }
      );
    }
  }
}
