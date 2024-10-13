import { HttpClient, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

/**
 * Service for retrieving driver and package count.
 * 
 * @class UtilsService
 */
export class UtilsService {

  private apiUrl = "http://35.187.241.193:8080/api/v1/count";
  
  /**
   * Constructor that injects the HttpClient for making HTTP requests.
   * 
   * @param http - Http client
   */
  constructor(private http: HttpClient) {}

  /**
   * Method that returns the driver and package count.
   * 
   * @returns {Observable<any>} - Driver and package count
   */
  getCount(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
