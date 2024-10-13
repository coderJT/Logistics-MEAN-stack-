import { Component } from '@angular/core';
import { PackageService } from '../package.service';
import { io, Socket } from 'socket.io-client';

@Component({
  selector: 'app-distance',
  standalone: true,
  templateUrl: './distance.component.html',
  styleUrls: ['./distance.component.css']
})

/**
 * This component is responsible for finding the distance between 'Melbourne' and the package destination of a package.
 * 
 * This component allows user to select a package and the destination of the package is then sent to the backend to perform
 * the calculation of distance. Once the response is received, the distance is then updated on the page.
 * 
 * @class DistanceComponent
 */
export class DistanceComponent {

  packages: any[] = [];
  private socket: Socket;
  selectedPackageId: string | null = null;
  distance: number = 0;

  constructor(private packageService: PackageService) {
    this.socket = io('http://http://35.187.241.193:8080');

    this.socket.on('distanceResult', (data: { packageId: string, distance: number }) => {
      if (data && data.packageId) {
        this.distance = data.distance;
        console.log(`Distance for package ${data.packageId}: ${this.distance}`);
      }
    });
  }

  /**
   * Load the packages on initialization.
   * 
   * @returns {void}
   */
  ngOnInit(): void {
    this.distance = 0;
    this.packageService.getPackages().subscribe(
      (response: any[]) => {
        this.packages = response;
      },
      (error) => {
        console.error('Failed to load packages:', error);
      }
    );
  }

  /**
   * Disconnect the socket when the component is destroyed.
   * 
   * @returns {void}
   */
  ngOnDestroy(): void {
    this.socket.disconnect(); 
  }

  /**
   * This function is responsible for obtaining the distance between two packages.
   * @param {string} packageId - Package mongoose id.
   * @param {string} destination - Destination of the package.
   * 
   * @returns {void}
   */
  sendDestination(packageId: string, destination: string): void {
    this.selectedPackageId = packageId;
    this.socket.emit('calculateDistance', { packageId, destination });
  }
}
