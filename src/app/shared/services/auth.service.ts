import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  setAccessToken(token: string): void {
    localStorage.setItem('token', token);
  }

  removeAccessToken(): void {
    localStorage.removeItem('token');
  }

  getAccessToken(): string | null {
    return localStorage.getItem('token');
  }
}
