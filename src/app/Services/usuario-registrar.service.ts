import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../app/Components/models/user.model'; // Importar modelo
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioRegistrarService {
  private urlBase = 'https://934vm7pw-5062.usw3.devtunnels.ms/api/User';

  constructor(private http: HttpClient) {}

  // Método para registrar un usuario
  registerUser(usuario: User): Observable<any> {
    return this.http.post(`${this.urlBase}/Register`, usuario).pipe(
      catchError(err => {
        console.error('Error al registrar usuario:', err);
        let mensaje = 'Hubo un problema al registrar el usuario.';
        if (err.status === 409) {
          mensaje = 'El correo ya está registrado.';
        } else if (err.status === 400) {
          mensaje = 'Datos inválidos, por favor revisa la información ingresada.';
        } else if (err.status === 500) {
          mensaje = 'Error del servidor, intenta más tarde.';
        }
        return throwError(() => new Error(mensaje));
      })
    );
  }

  // Método para verificar si un correo ya está registrado
  verificarCorreo(correo: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.urlBase}/Correo/${encodeURIComponent(correo)}`).pipe(
      map(response => !!response), // Si hay respuesta, significa que el correo existe
      catchError(err => {
        console.warn('No se pudo verificar el correo:', err);
        return throwError(() => new Error('No se pudo verificar el correo.'));
      })
    );
  }
}
