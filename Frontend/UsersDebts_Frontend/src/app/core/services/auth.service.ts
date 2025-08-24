import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

export interface RegisterPayload {
  name: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:5227/api/auth';

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/login`, credentials);
  }

  register(data: RegisterPayload): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/register`, data);
  }
}
