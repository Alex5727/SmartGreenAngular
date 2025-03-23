import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'authToken';

  saveToken(token: string): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        localStorage.setItem(this.tokenKey, token);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }
}