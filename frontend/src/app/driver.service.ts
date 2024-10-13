import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  private apiUrl = 'http://34.143.184.233:8080/api/v1/drivers';

  constructor(private http: HttpClient, private authentication: AuthenticationService) { }

  private getHeaders(): HttpHeaders {
    return this.authentication.setAuthHeaders();
  }

  getDrivers(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(this.apiUrl, { headers });
  }

  getDriverById(driverId: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.apiUrl}/${driverId}`, { headers });
  }

  addDriver(driver: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>(this.apiUrl, driver, { headers });
  }

  updateDriver(driverId: string, driverInfo: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put<any>(`${this.apiUrl}/${driverId}`, driverInfo, { headers });
  }

  removeDriver(driverId: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete<any>(`${this.apiUrl}/${driverId}`, { headers });
  }

  getDriversByDepartment(department: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.apiUrl}/department/${department}`, { headers });
  }
}
