import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  private apiUrl = 'http://localhost:3000/api/v1/statistics';

  constructor(private http: HttpClient) { }

  getStatistics() {
    return this.http.get(this.apiUrl);
  }
}
