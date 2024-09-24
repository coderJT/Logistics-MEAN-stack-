import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DriverService {
  private apiUrl = 'http://localhost:8080/api/v1/drivers';

  constructor(private http: HttpClient) { }

  getDrivers() {
    return this.http.get(this.apiUrl);
  }

  addDriver(driver: any) {
    return this.http.post(this.apiUrl, driver);
  }

  updateDriver(driverInfo: any) {
    return this.http.put(`${this.apiUrl}/`, driverInfo);
  }

  removeDriver(id: string) {
    return this.http.delete(`${this.apiUrl}/?_id=${id}`);
  }

}
