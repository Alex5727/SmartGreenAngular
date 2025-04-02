import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { User } from '../models/user.model';
import { AdminUserService } from '../services/admin-user.service';
import { CommonModule } from '@angular/common';
import { updateUserDTO } from '../models/DTOs/updateUserDTO';
import { uptime } from 'process';
import { AuthServiceService } from '../../Services/auth-service.service';
import { lastValueFrom } from 'rxjs';
import { mergeMap, throwError } from 'rxjs';
// O la importación combinada si ya tienes otros operadores


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
  usuario: User | null = null;
  isLoading: Boolean = false;
  success: Boolean = false;
  error: Boolean = false;
  errorMessage: string = '';


  constructor(private adminUserService: AdminUserService, private auth: AuthServiceService) {}

  ngOnInit(): void {
    if (!this.auth.getToken())
      {
        window.location.href = '/login';
      }

    this.loadUsers();
  }

  loadUsers(): void {
    this.adminUserService.getUsers().subscribe((data) => {
      this.users = data;
      this.FiltrarUsuarios();
    });
  }

  FiltrarUsuarios(): void {
    this.userAdmin = this.users.filter((user) => user.usuarioTipo === 'admin');
    this.userscommon = this.users.filter((user) => user.usuarioTipo === 'user');
  }

  openModal(user: User): void {
    this.selectedUser = user;
    this.usuario = {
      correo: user.correo,
      nombre: user.nombre,
      celular: user.celular,
      usuarioTipo: user.usuarioTipo
    } as User;
  }

  closeModal(): void {
    this.selectedUser = null;
  }

  onSelectType(tipo: string): void{
    if(this.usuario != null)
      {
        this.usuario.usuarioTipo = tipo;
      }
  }

  async saveUser(upUser: updateUserDTO): Promise<void> {
    try {
      this.isLoading = true;
      
      // REMOVER el mergeMap que fuerza el error durante operación normal
      await lastValueFrom(this.adminUserService.updateUser(upUser));
      
      this.loadUsers();
      this.closeModal();
      this.success = true;
      this.isLoading = false;
    } catch (er) {
      this.isLoading = false;
      this.closeModal();
      if (er instanceof Error) {
        this.errorMessage = `Error: ${er.message}`;
      } else if (typeof er === 'string') {
        this.errorMessage = er;
      } else {
        this.errorMessage = 'Error desconocido durante la actualización.';
      }
      this.error = true;
      console.error('Error capturado:', er);
    }
  }

  navigateToRegister(): void {
    window.location.href = '/reg-usuario';
  }
}