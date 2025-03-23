import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public isLoggedIn = false;
  public msgUser = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  private validation(email: string, password: string): boolean {
    return email.trim() !== '' && password.trim() !== '';
  }

  public async login(email: string, password: string): Promise<void> {
    if (!this.validation(email, password)) {
      this.msgUser = 'Debe ingresar usuario y contraseña';
      return;
    }

    const url = 'https://934vm7pw-5062.usw3.devtunnels.ms/api/User/Login';
    const requestLogin = { Email: email, Password: password };

    try {
      const token = await firstValueFrom(
        this.http.post(url, requestLogin, { responseType: 'text' })
      );

      await this.authService.saveToken(token);
      this.isLoggedIn = true;

      this.router.navigate(['/menuView']);
    } catch (error) {
      this.msgUser = 'Correo o contraseña inválida. Intente nuevamente.';
      console.error('Error en la conexión:', error);
    }
  }
}