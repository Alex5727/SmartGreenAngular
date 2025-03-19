import { Component } from '@angular/core';
import { User } from '../models/user.model';
import { AdminUserService } from '../services/admin-user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-cuentas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-cuentas.component.html',
  styleUrls: ['./admin-cuentas.component.css']
})
export class AdminCuentasComponent {
  users: User[] = [];
  userAdmin: User[] = [];
  userscommon: User[] = [];
  selectedUser: User | null = null;

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
}