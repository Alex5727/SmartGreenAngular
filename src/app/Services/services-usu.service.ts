import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesUsuService {
  private apiUrl = 'https://5r1v7n94-5062.usw3.devtunnels.ms/api/User';

  constructor(private http: HttpClient) {}

  // Método para registrar un nuevo usuario
  registrarUsuario(usuario: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/Register`, usuario);
  }

  // Método para verificar si el correo del usuario ya está registrado
  verificarUsuarioPorCorreo(correo: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/Correo/${correo}`);
  }
}