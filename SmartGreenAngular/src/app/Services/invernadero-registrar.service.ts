import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvernaderoRegistrarService {
  private url = 'https://localhost:44396/api/Invernadero';

  constructor(private http: HttpClient) {}

  // Verifica si el ID del invernadero ya está en uso
  verificarInvernadero(id: string): Observable<any> {
    return this.http.get(`${this.url}/Find/${id}`);
  }

  // Registra el invernadero en la API
  registrarInvernadero(id: string, tipo: string): Observable<any> {
    const invernadero = { id, tipo };
    return this.http.post(`${this.url}/RegistrarInvernadero`, invernadero);
  }
}