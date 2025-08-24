import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DebtService {
  private apiUrl = 'http://localhost:5227/api/debts';

  constructor(private http: HttpClient) {}

  getDebts(filter?: string): Observable<any[]> {
    let url = this.apiUrl;
    if (filter) url += `?status=${filter}`;
    return this.http.get<any[]>(url);
  }

  getDebt(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createDebt(debt: any): Observable<any> {
    return this.http.post(this.apiUrl, debt);
  }
}
