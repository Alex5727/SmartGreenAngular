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

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url+this.findall).pipe(
      catchError(error => {
        return throwError(() => error)
      })
    );
  }

  updateUser(upUser: updateUserDTO): Observable<User>{
    return this.http.patch<User>(this.url+this.update, upUser).pipe(
      catchError(error => {
        return throwError(() => error)
      })
    );;
  }
}
