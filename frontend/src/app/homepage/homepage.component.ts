import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../utils.service';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'] 
})

/**
 * This component is responsible for displaying the home page.
 * 
 * This component will display the number of drivers and packages to the user.
 * 
 * @class HomepageComponent
 */
export class HomepageComponent {

  /**
   * This is the driver count.
   */
  driverCount: number = 0;  

  /**
   * This is the package count.
   */
  packageCount: number = 0;

  /**
   * Constructor that injects the UtilsService for handling driver and package count operations.
   * 
   * @param {UtilsService} utilsService - Service used to perform utility operations.
   */
  constructor(private utilsService: UtilsService) {}

  /**
   * Load the driver and package counts on initialization.
   * 
   * @returns {void}
   */
  ngOnInit(): void {
    this.utilsService.getCount().subscribe(
      (response: any) => {
        this.driverCount = response.driverCount;
        this.packageCount = response.packageCount;
      },
      (error) => {
        console.error('Failed to load driver and package counts:', error);
      }
    );
  }
}
