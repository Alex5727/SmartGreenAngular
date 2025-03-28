import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { updateUserDTO } from '../models/DTOs/updateUserDTO';

@Injectable({
  providedIn: 'root'
})
export class AdminUserService {
  private url = 'http://localhost:5062/api/User/';
  private findall = 'FindAll';
  private update = 'UpdateUser';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url+this.findall);
  }

  updateUser(upUser: updateUserDTO): Observable<User>{
    return this.http.patch<User>(this.url+this.update, upUser);
  }
}
