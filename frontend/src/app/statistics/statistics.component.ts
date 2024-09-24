import { Component, OnInit } from '@angular/core';
import { StatisticsService } from '../statistics.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [],
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  createCount: number = 0;
  readCount: number = 0;
  updateCount: number = 0;
  deleteCount: number = 0;

  constructor(private statisticsService: StatisticsService, private router: Router) {}

  ngOnInit(): void {
    this.loadStatistics();
  }

  loadStatistics() {
    this.statisticsService.getStatistics().subscribe(
      (response: any) => {
        this.createCount = response.createCount;
        this.readCount = response.readCount;
        this.updateCount = response.updateCount;
        this.deleteCount = response.deleteCount;
      },
      error => {
        console.error('Failed to load statistics:', error);
        this.router.navigate(['/invalid_data']); 
      }
    );
  }
}
