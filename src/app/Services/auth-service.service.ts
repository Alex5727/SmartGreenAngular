import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from 'express';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor( private http: HttpClient,
    private router: Router,
    ) { }

    private tokenKey = 'authToken';
    private CorreoKey = '';

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

  saveCorreo(correo: string): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        localStorage.setItem(this.CorreoKey, correo);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getEmail(): string | null {
    return localStorage.getItem(this.CorreoKey);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey); 
    localStorage.removeItem(this.CorreoKey);

  }
}
