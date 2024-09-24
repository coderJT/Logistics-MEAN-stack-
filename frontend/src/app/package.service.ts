import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PackageService {

  private apiUrl = 'http://localhost:3000/api/v1/drivers';

  constructor(private http: HttpClient) { }

  getPackages() {
    return this.http.get(this.apiUrl);
  }

  addPackage(packageInfo: any) {
    return this.http.post(this.apiUrl, packageInfo);
  }

  removePackage(packageId: string) {
    return this.http.delete(`${this.apiUrl}/:id=${packageId}`);
  }

  updatePackage(packageInfo: any) {
    return this.http.put(`${this.apiUrl}/`, packageInfo);
  }
}
