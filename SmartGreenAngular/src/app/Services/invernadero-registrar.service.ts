import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InvernaderoRegistrarService {
  private url = 'https://localhost:44396/api/Invernadero';

  constructor(private http: HttpClient) {}

  // Verifica si el ID del invernadero ya está en uso
  verificarInvernadero(id: string): Observable<boolean> {
    return this.http.get<any>(`${this.url}/Find/${id}`).pipe(
      map(response => !!response), // Si encuentra algo, devuelve true
      catchError((error) => {
        if (error.status === 404) {
          // No encontrado: está disponible
          return of(false);
        } else {
          console.error('Error al verificar el invernadero:', error);
          return throwError(() => new Error('No se pudo verificar el invernadero.'));
        }
      })
    );
  }

  // Registra el invernadero
  registrarInvernadero(id: string, tipo: number): Observable<any> {
    const url = `${this.url}/Create?id=${id}&tipo=${tipo}`;
    return this.http.post(url, null);
  }
}