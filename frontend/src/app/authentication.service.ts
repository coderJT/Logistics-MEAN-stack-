import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiUrl = 'http://localhost:8080/api/v1/auth/';

  constructor(private http: HttpClient) { }

  login(credentials: { username: string, password: string }): Observable<any> {
      return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  signUp(credentials: { username: string, password: string }): Observable<any> {
      return this.http.post(`${this.apiUrl}/signup`, credentials);
  } 
}
