import { Component, OnDestroy, OnInit } from '@angular/core';
import { PackageService } from '../package.service';
import { io, Socket } from 'socket.io-client';

@Component({
  selector: 'app-distance',
  standalone: true,
  templateUrl: './distance.component.html',
  styleUrls: ['./distance.component.css']
})
export class DistanceComponent implements OnInit, OnDestroy {
  packages: any[] = [];
  private socket: Socket;
  selectedPackageId: string | null = null;
  distance: number = 0;

  constructor(private packageService: PackageService) {
    this.socket = io('http://localhost:8080');

    this.socket.on('distanceResult', (data: { packageId: string, distance: number }) => {
      if (data && data.packageId) {
        this.distance = data.distance;
        console.log(`Distance for package ${data.packageId}: ${this.distance}`);
      }
    });
  }

  ngOnInit(): void {
    this.loadPackages();
  }

  ngOnDestroy(): void {
    this.socket.disconnect(); 
  }

  loadPackages() {
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

  sendDestination(packageId: string, destination: string): void {
    this.selectedPackageId = packageId;
    this.socket.emit('calculateDistance', { packageId, destination });
  }
}
