import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inver } from '../Clases/inver';

@Injectable({
  providedIn: 'root'
})
export class InvernaderosServiceService {
  private url = 'https://h387mpbd-5062.usw3.devtunnels.ms/api/Invernadero/FindByEmail/';
  private correo = '7loquesea@aa.com';


  constructor(private http: HttpClient) { }

  getInvers(correo: string): Observable<Inver[]> {
    return this.http.get<Inver[]>(this.url+correo);
  }

  
}