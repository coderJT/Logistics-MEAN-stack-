import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PackageService {

  private apiUrl = 'http://localhost:8080/api/v1/packages'; // Adjusted endpoint to reflect packages

  constructor(private http: HttpClient, private authentication: AuthenticationService) { }

  private getHeaders(): HttpHeaders {
    return this.authentication.setAuthHeaders();
  }

  getPackages(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(this.apiUrl, { headers });
  }

  addPackage(packageInfo: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>(this.apiUrl, packageInfo, { headers });
  }

  removePackage(packageId: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete<any>(`${this.apiUrl}/${packageId}`, { headers });
  }

  updatePackage(packageId: string, packageInfo: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put<any>(`${this.apiUrl}/${packageId}`, packageInfo, { headers });
  }
}
