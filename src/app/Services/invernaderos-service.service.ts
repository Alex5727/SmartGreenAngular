import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inver } from '../Clases/inver';

@Injectable({
  providedIn: 'root'
})
export class InvernaderosServiceService {
  private url = 'https://934vm7pw-5062.usw3.devtunnels.ms/api/Invernadero/FindAll';


  private inverCache: Inver[] | null = null;
  private readonly localStorageKey = 'inver_cache';
  private readonly cacheTimeKey = 'inver_cache_time';
  private readonly cacheDurationMs = 5 * 60 * 1000; // 5 minutos

  constructor(private http: HttpClient) {}

  getInvers(): Observable<Inver[]> {
    // 1. Si ya está en memoria, úsalo
    if (this.inverCache) {
      return new Observable(observer => {
        observer.next(this.inverCache!);
        observer.complete();
      });
    }

    // 2. Verifica si hay algo en localStorage y no está viejo
    const cacheJson = localStorage.getItem(this.localStorageKey);
    const cacheTime = localStorage.getItem(this.cacheTimeKey);
    if (cacheJson && cacheTime && Date.now() - +cacheTime < this.cacheDurationMs) {
      this.inverCache = JSON.parse(cacheJson);
      return new Observable(observer => {
        observer.next(this.inverCache!);
        observer.complete();
      });
    }

    // 3. Si no hay caché válido, carga desde el backend
    return new Observable(observer => {
      this.http.get<Inver[]>(this.url).subscribe({
        next: (data) => {
          this.inverCache = data;
          localStorage.setItem(this.localStorageKey, JSON.stringify(data));
          localStorage.setItem(this.cacheTimeKey, Date.now().toString());
          observer.next(data);
          observer.complete();
        },
        error: err => observer.error(err)
      });
    });
  }

  clearCache(): void {
    this.inverCache = null;
    localStorage.removeItem(this.localStorageKey);
    localStorage.removeItem(this.cacheTimeKey);
  }
}
