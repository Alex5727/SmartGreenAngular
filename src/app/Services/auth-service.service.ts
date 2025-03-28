import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router'; // Corregido

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor( private http: HttpClient, private router: Router ) { }

  private tokenKey = 'authToken';
  private correoKey = 'authEmail';

  async saveToken(token: string): Promise<void> {
    try {
      localStorage.setItem(this.tokenKey, token);
    } catch (error) {
      console.error('Error guardando el token:', error);
      throw error;
    }
  }

  async saveCorreo(correo: string): Promise<void> {
    try {
      localStorage.setItem(this.correoKey, correo);
    } catch (error) {
      console.error('Error guardando el correo:', error);
      throw error;
    }
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getEmail(): string | null {
    return localStorage.getItem(this.correoKey); // Clave corregida
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey); 
    localStorage.removeItem(this.correoKey); // Clave corregida
    this.router.navigate(['/login']); // Opcional: Redirigir a login tras cerrar sesión
  }
}
