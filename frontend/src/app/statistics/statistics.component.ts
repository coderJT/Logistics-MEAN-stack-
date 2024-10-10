import { Component } from '@angular/core';
import { StatisticsService } from '../statistics.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [],
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})

/**
 * This component is responsible for displaying the statistics of the CRUD operations.
 * 
 * @component StatisticsComponent
 */
export class StatisticsComponent {
  createCount: number = 0;
  readCount: number = 0;
  updateCount: number = 0;
  deleteCount: number = 0;

  /**
   * Constructor that injects the StatisticsService and Router for handling statistics-related operations
   * and to navigate between routes.
   * 
   * @param {StatisticService} statisticsService - Service used to perform database operations on statistics.
   * @param {Router} router - Router for navigating to other routes after successful operations.
   */
  constructor(private statisticsService: StatisticsService, private router: Router) {}

  /**
   * This method loads the statistics of the CRUD operations on iniitialization of the component.
   */
  ngOnInit(): void {
    this.statisticsService.getStatistics().subscribe(
      (response: any) => {
        this.createCount = response.createCount;
        this.readCount = response.readCount;
        this.updateCount = response.updateCount;
        this.deleteCount = response.deleteCount;
      },
      error => {
        console.error('Failed to load statistics:', error);
        this.router.navigate(['invalid-data']); 
      }
    );
  }
}
