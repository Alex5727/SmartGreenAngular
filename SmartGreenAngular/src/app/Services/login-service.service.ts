import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AuthServiceService } from './auth-service.service';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  public isLoggedIn = false;
  public msgUser = '';

  constructor( private http: HttpClient,
    private router: Router,
    private authService: AuthServiceService) { }

    private validation(email: string, password: string): boolean {
      return email.trim() !== '' && password.trim() !== '';
    }
  
    public async login(email: string, password: string): Promise<void> {
      if (!this.validation(email, password)) {
        this.msgUser = 'Debe ingresar usuario y contraseña';
        return;
      }
  
      const url = 'https://localhost:44396/api/User/Login';
      const requestLogin = { Email: email, Password: password };
  
      try {
        const token = await firstValueFrom(
          this.http.post(url, requestLogin, { responseType: 'text' })
        );
  
        await this.authService.saveToken(token);
        await this.authService.saveCorreo(email);
        this.isLoggedIn = true;
  
        this.router.navigate(['/menu-invernaderos']);
      } catch (error) {
        this.msgUser = 'Correo o contraseña inválida. Intente nuevamente.';
        console.error('Error en la conexión:', error);
      }
    }


  }


