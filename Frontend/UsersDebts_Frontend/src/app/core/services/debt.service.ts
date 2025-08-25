import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DebtService {
  private apiUrl = 'http://localhost:49842';

  private get userId(): number | null {
    const id = localStorage.getItem('userId');
    return id ? Number(id) : null;
  }

  constructor(private http: HttpClient) {}

  getDebts(isPaid?: boolean): Observable<any[]> {
    if (!this.userId) throw new Error('No userId');
    let url = `${this.apiUrl}/users/${this.userId}/debts`;
    if (isPaid !== undefined) url += `?isPaid=${isPaid}`;
    return this.http.get<any[]>(url);
  }

  getDebt(debtId: number): Observable<any> {
    if (!this.userId) throw new Error('No userId');
    return this.http.get<any>(`${this.apiUrl}/users/${this.userId}/debts/${debtId}`);
  }

  createDebt(debt: any): Observable<any> {
    if (!this.userId) throw new Error('No userId');
    return this.http.post(`${this.apiUrl}/users/${this.userId}/debts`, debt);
  }

  updateDebt(debtId: number, update: any): Observable<any> {
    if (!this.userId) throw new Error('No userId');
    return this.http.put(`${this.apiUrl}/users/${this.userId}/debts/${debtId}`, update);
  }

  deleteDebt(debtId: number): Observable<any> {
    if (!this.userId) throw new Error('No userId');
    return this.http.delete(`${this.apiUrl}/users/${this.userId}/debts/${debtId}`);
  }

  markAsPaid(debtId: number): Observable<any> {
    if (!this.userId) throw new Error('No userId');
    return this.http.post(`${this.apiUrl}/users/${this.userId}/debts/${debtId}/pay`, {});
  }
}
