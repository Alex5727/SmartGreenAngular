import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { User } from '../models/user.model';
import { updateUserDTO } from '../models/DTOs/updateUserDTO';

@Injectable({
  providedIn: 'root'
})
export class AdminUserService {
  private url = 'https://934vm7pw-5062.usw3.devtunnels.ms/api/User/';
  private findall = 'FindAll';
  private update = 'UpdateUser';

  private userCache: User[] | null = null;
  private readonly localStorageKey = 'users_cache';
  private readonly cacheTimeKey = 'users_cache_time';
  private readonly cacheDurationMs = 5 * 60 * 1000; // 5 minutos

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    // 1. Usar caché en memoria si existe
    if (this.userCache) {
      return new Observable(observer => {
        observer.next(this.userCache!);
        observer.complete();
      });
    }

    // 2. Verificar en localStorage
    const cacheJson = localStorage.getItem(this.localStorageKey);
    const cacheTime = localStorage.getItem(this.cacheTimeKey);
    if (cacheJson && cacheTime && Date.now() - +cacheTime < this.cacheDurationMs) {
      this.userCache = JSON.parse(cacheJson);
      return new Observable(observer => {
        observer.next(this.userCache!);
        observer.complete();
      });
    }

    // 3. Si no hay caché o está expirado, hacer petición al backend
    return new Observable(observer => {
      this.http.get<User[]>(this.url + this.findall).subscribe({
        next: (data) => {
          this.userCache = data;
          localStorage.setItem(this.localStorageKey, JSON.stringify(data));
          localStorage.setItem(this.cacheTimeKey, Date.now().toString());
          observer.next(data);
          observer.complete();
        },
        error: err => observer.error(err)
      });
    });
  }

  deleteUser(email: string): Observable<any> {
    return this.http.delete(this.url + email); // Devuelve el Observable para que pueda ser suscrito
  }

  updateUser(upUser: updateUserDTO): Observable<User> {
    // Limpiamos el caché antes o después de actualizar, para mantener los datos sincronizados
    this.clearCache();

    return this.http.patch<User>(this.url + this.update, upUser).pipe(
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  clearCache() {
    this.userCache = null;
    localStorage.removeItem(this.localStorageKey);
    localStorage.removeItem(this.cacheTimeKey);
  }
}

