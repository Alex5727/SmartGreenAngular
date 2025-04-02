import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../app/Components/models/user.model'; // Importar modelo
import { Observable, throwError } from 'rxjs'; // Importar Observable y throwError
import { catchError } from 'rxjs/operators'; // Importar catchError

@Injectable({
  providedIn: 'root'
})
export class UsuarioRegistrarService {
  private url = 'https://localhost:44396/api/User/Register';

  constructor(private http: HttpClient) { }

  registerUser(usuario: User): Observable<any> {
    return this.http.post(this.url, usuario).pipe(
      catchError(err => {
        console.error('Error al registrar usuario:', err);
        return throwError(() => new Error('Hubo un problema al registrar el usuario'));
      })
    );
  }
}