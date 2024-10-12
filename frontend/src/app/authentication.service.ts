import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  private apiUrl = 'http://34.46.148.187 /api/v1';

  private loggedInSubject = new BehaviorSubject<boolean>(this.isTokenAvailable());

  constructor(private http: HttpClient, private router: Router) { }

  private isTokenAvailable(): boolean {
    return localStorage.getItem('token') !== null;
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
    this.loggedInSubject.next(true); 
  }

  clearToken(): void {
    localStorage.removeItem('token');
    this.loggedInSubject.next(false); 
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedInSubject.asObservable(); 
  }

  login(credentials: { username: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        if (response.token) {
          this.setToken(response.token);
        }
      })
    );
  }

  signUp(credentials: { username: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/signup`, credentials);
  }

  logout(): Observable<void> {
    this.clearToken();
    this.router.navigate(['/login']);
    return of(); 
  }

  setAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : new HttpHeaders();
  }
}
