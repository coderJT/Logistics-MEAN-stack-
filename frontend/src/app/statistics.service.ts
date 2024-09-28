import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service'; 

@Injectable({
  providedIn: 'root'
})

export class StatisticsService {

  private apiUrl = 'http://localhost:8080/api/v1/statistics';

  constructor(private http: HttpClient, private authService: AuthenticationService) { }

  getStatistics(): Observable<any> {
    const headers = this.authService.setAuthHeaders(); 
    return this.http.get<any>(this.apiUrl, { headers });
  }
}
