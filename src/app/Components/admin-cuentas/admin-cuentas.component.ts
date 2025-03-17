import { TableModule } from 'primeng/table';
import { User } from '../models/user.model';
import { AdminUserService } from '../services/admin-user.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SiderbarComponent } from '../../siderbar/siderbar.component';

@Component({
  selector: 'app-admin-cuentas',
  imports: [CommonModule, TableModule],
  templateUrl: './admin-cuentas.component.html',
  styleUrl: './admin-cuentas.component.css'
})
export class AdminCuentasComponent {
  users: User[] = [];
  userAdmin: User[] = [];
  userscommon: User[] = [];

  constructor(private adminUserService: AdminUserService) { }
  ngOnInit(){
    this.loadUsers();
  }

  loadUsers() {
    this.adminUserService.getUsers().subscribe((data) => {
      this.users = data;
      console.log(data);
      this.userAdmin = this.users.filter((user) => user.usuarioTipo === 'admin');
      this.userscommon = this.users.filter((user) => user.usuarioTipo === 'user');
    });
  }
}
