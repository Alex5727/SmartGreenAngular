import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../app/Components/models/user.model'; // Importar modelo
import { Observable } from 'rxjs'; // Importar Observable

@Injectable({
  providedIn: 'root'
})
export class UsuarioRegistrarService {
  private url = 'https://localhost:44396/api/User/Register';

  constructor(private http: HttpClient) { }

  registerUser(usuario: User): Observable<any> {
    return this.http.post(this.url, usuario);
  }
}