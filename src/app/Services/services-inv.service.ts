import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesInvService {
  private apiUrl = 'https://5r1v7n94-5062.usw3.devtunnels.ms/api/Invernadero';

  constructor(private http: HttpClient) {}

  // Método para registrar un nuevo invernadero
  registrarInvernadero(invernadero: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/Create`, invernadero);
  }

  // Método para verificar si el correo asociado a la ID del invernadero está ocupado
  verificarInvernaderoPorEmail(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/FindByEmail/${id}`);
  }

  // Método para obtener todos los invernaderos (opcional, dependiendo de tu uso)
  obtenerInvernaderos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/FindAll`);
  }
}