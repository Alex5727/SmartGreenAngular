import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { User } from '../models/user.model';
import { AdminUserService } from '../services/admin-user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-cuentas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-cuentas.component.html',
  animations: [
    trigger('fadeInOut',[
      state('void', style({
        opacity: 0
      })),
      transition(':enter', [
        animate('500ms 0s ease-in')
      ]),
      transition(':leave', [
        animate('500ms 0s ease-out', style({
          opacity: 0
        }))
      ])
    ])
  ],
  styleUrls: ['./admin-cuentas.component.css']
})
export class AdminCuentasComponent {
  users: User[] = [];
  userAdmin: User[] = [];
  userscommon: User[] = [];
  selectedUser: User | null = null;
  userType = ['admin', 'user'];


  constructor(private adminUserService: AdminUserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.adminUserService.getUsers().subscribe((data) => {
      this.users = data;
      this.userAdmin = this.users.filter((user) => user.usuarioTipo === 'admin');
      this.userscommon = this.users.filter((user) => user.usuarioTipo === 'user');
    });
  }

  openModal(user: User): void {
    this.selectedUser = user;
  }

  closeModal(): void {
    this.selectedUser = null;
  }

  onSelectType(tipo: string): void{
    if(this.selectedUser != null)
      {
        this.selectedUser.usuarioTipo = tipo;
      }
  }

  saveUser(): void
  {

  }
}