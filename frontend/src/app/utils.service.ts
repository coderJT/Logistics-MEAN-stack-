import { HttpClient, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  private apiUrl = "http://localhost:8080/api/v1/count";
  
  constructor(private http: HttpClient) {}

  getCount(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
