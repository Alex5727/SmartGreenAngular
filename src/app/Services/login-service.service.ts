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
      // Ejemplo: verifica que no estén vacíos
      return email.trim() !== '' && password.trim() !== '';
    }
  
    // Método adaptado a Angular, usando async/await y firstValueFrom para convertir el observable a Promise
    public async login(email: string, password: string): Promise<void> {
      // Ejecuta la validación
      if (!this.validation(email, password)) {
        this.msgUser = 'Debe ingresar usuario y contraseña';
        return;
      }
  
      const url = 'https://934vm7pw-5062.usw3.devtunnels.ms/api/User/Login';
      // Modelo de datos para el login (asegúrate de que las propiedades coincidan con lo que espera la API)
      const requestLogin = { Email: email, Password: password };
  
      try {
        // Realiza el POST y espera la respuesta (se espera que la respuesta sea un token en formato texto)
        const token = await firstValueFrom(
          this.http.post(url, requestLogin, { responseType: 'text' })
        );
  
        // Guarda el token usando el AuthService (se asume que saveToken devuelve una Promise)
        await this.authService.saveToken(token);
        this.isLoggedIn = true;
  
        // Navega a la página principal (ajusta la ruta según tu configuración)
        this.router.navigate(['/menu-invernaderos']);
      } catch (error) {
        // En caso de error, actualiza el mensaje para el usuario
        this.msgUser = 'Correo o contraseña inválida. Intente nuevamente.';
        console.error('Error en la conexión:', error);
      }
    }

    private Confirmar(): string{
      return this.msgUser;
    }


  }


