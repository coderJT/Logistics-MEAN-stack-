import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../utils.service';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'] 
})
export class HomepageComponent implements OnInit {
  driverCount: number = 0;  
  packageCount: number = 0;

  constructor(private utilsService: UtilsService) {}

  ngOnInit(): void {
    this.loadCount();
  }

  loadCount(): void {
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
