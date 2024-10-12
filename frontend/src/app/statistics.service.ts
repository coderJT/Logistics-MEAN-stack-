import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service'; 

@Injectable({
  providedIn: 'root'
})  

/**
 * Service that handles statistics (CRUD operation count).
 * 
 * @class StatisticsService
 */
export class StatisticsService {

  private apiUrl = 'http://34.46.148.187:8080/api/v1/statistics';

  /**
   * Constructor that injects the AuthenticationService for handling authentication-related operations,
   * and also http client for making HTTP requests.
   * @param {HttpClient} http - Http client
   * @param {AuthenticationService} authService - Authentication Servicce
   */
  constructor(private http: HttpClient, private authService: AuthenticationService) { }

  /**
   * Method that returns the driver and package count by calling 
   * @returns {Observable<any>} - Driver and package count
   */
  getStatistics(): Observable<any> {
    const headers = this.authService.setAuthHeaders(); 
    return this.http.get<any>(this.apiUrl, { headers });
  }
}
