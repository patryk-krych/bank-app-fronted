import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface AccountDTO {
  accountId: string;
  balance: number;
  currency: string;
}

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private http = inject(HttpClient);

  private accountsSubject = new BehaviorSubject<AccountDTO[] | null>(null);
  accounts$ = this.accountsSubject.asObservable();

  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  fetchAccounts(): Observable<AccountDTO[]> {
    const token = this.getToken();
    console.log('Current token in AccountService:', token);
    if (!token) throw new Error("No token");

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<AccountDTO[]>('http://localhost:8080/api/user/accounts', { headers })
      .pipe(tap(accounts => this.accountsSubject.next(accounts)));
  }
}
