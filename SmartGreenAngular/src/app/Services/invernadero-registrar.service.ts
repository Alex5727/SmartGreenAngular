import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InvernaderoRegistrarService {
  private url = 'https://localhost:44396/api/Invernadero';

  constructor(private http: HttpClient) {}

  // Verifica si el ID del invernadero ya está en uso
  verificarInvernadero(id: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.url}/Find/${id}`).pipe(
      catchError((error) => {
        console.error('Error al verificar el invernadero:', error);
        return of(false); // En caso de error, asumimos que no existe.
      })
    );
  }

  // Registra el invernadero en la API
  registrarInvernadero(id: string, tipo: number): Observable<any> {
    const url = `${this.url}/Create?id=${id}&tipo=${tipo}`;
    return this.http.post(url, null); // Cambié el cuerpo del POST a null ya que no se necesita
  }
}