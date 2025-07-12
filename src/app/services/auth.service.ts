import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface UserDTO {
  id: number;
  firstName: string;
  lastName: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private userSubject = new BehaviorSubject<UserDTO | null>(null);

  user$ = this.userSubject.asObservable();

  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  setToken(token: string) {
    localStorage.setItem('jwtToken', token);
  }

  clearToken() {
    localStorage.removeItem('jwtToken');
    this.userSubject.next(null);
  }

  fetchCurrentUser(): Observable<UserDTO> {
    const token = this.getToken();
    console.log('Current token:', this.getToken());
    if (!token) throw new Error("No token");

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<UserDTO>('http://localhost:8080/api/user/me', { headers })
      .pipe(tap(user => this.userSubject.next(user)));
  }
}
