import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { StatsInvernaderos } from '../models/StatsInvernaderos.model';

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  private url = 'https://934vm7pw-5062.usw3.devtunnels.ms/api/DailyStat/';
  private GetAllStats = 'GetAllStats';

  private statsCache: StatsInvernaderos[] | null = null;
  private readonly localStorageKey = 'stats_cache';
  private readonly cacheTimeKey = 'stats_cache_time';
  private readonly cacheDurationMs = 5 * 60 * 1000; // 5 minutos

  constructor(private http: HttpClient) {}

  getAllStats(): Observable<StatsInvernaderos[]> {
    // 1. Si ya está en memoria, úsalo
    if (this.statsCache) {
      return new Observable(observer => {
        observer.next(this.statsCache!);
        observer.complete();
      });
    }

    // 2. Verifica si hay algo en localStorage y no está viejo
    const cacheJson = localStorage.getItem(this.localStorageKey);
    const cacheTime = localStorage.getItem(this.cacheTimeKey);
    if (cacheJson && cacheTime && Date.now() - +cacheTime < this.cacheDurationMs) {
      this.statsCache = JSON.parse(cacheJson);
      return new Observable(observer => {
        observer.next(this.statsCache!);
        observer.complete();
      });
    }

    // 3. Si no hay caché válido, carga desde el backend
    return new Observable(observer => {
      this.http.get<StatsInvernaderos[]>(this.url + this.GetAllStats).subscribe({
        next: (data) => {
          this.statsCache = data;
          localStorage.setItem(this.localStorageKey, JSON.stringify(data));
          localStorage.setItem(this.cacheTimeKey, Date.now().toString());
          observer.next(data);
          observer.complete();
        },
        error: err => observer.error(err)
      });
    });
  }

  clearCache() {
    this.statsCache = null;
    localStorage.removeItem(this.localStorageKey);
    localStorage.removeItem(this.cacheTimeKey);
  }
}

