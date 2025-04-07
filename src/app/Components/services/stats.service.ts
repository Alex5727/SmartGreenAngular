import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { StatsInvernaderos } from '../models/StatsInvernaderos.model';

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  private url = 'https://6p775mql-5062.usw3.devtunnels.ms/api/DailyStat/';
  private GetAllStats = 'GetAllStats';

  constructor(private http: HttpClient) { }

  getAllStats(): Observable<StatsInvernaderos[]> {
    return this.http.get<StatsInvernaderos[]>(this.url + this.GetAllStats).pipe(
      catchError(error => {
        return throwError(() => error)
      })
    );
  }
}
