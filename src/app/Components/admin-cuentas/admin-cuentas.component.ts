import { FormsModule } from '@angular/forms';
import { Component, ElementRef, HostListener } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { User } from '../models/user.model';
import { AdminUserService } from '../services/admin-user.service';
import { CommonModule } from '@angular/common';
import { updateUserDTO } from '../models/DTOs/updateUserDTO';
import { uptime } from 'process';
import { AuthServiceService } from '../../Services/auth-service.service';
import { lastValueFrom } from 'rxjs';
import { mergeMap, throwError } from 'rxjs';
import Swal from 'sweetalert2';
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
  searchTerm: string = '';
  filteredSuggestions: string[] = [];
  showSuggestions: boolean = false;
  selectedSuggestionIndex: number = -1;


  constructor(private adminUserService: AdminUserService, private auth: AuthServiceService, private eRef: ElementRef) {}

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    const clickedInside = this.eRef.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.showSuggestions = false;
    }
  }
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
      const nombre: String = upUser.nombre;
      Swal.fire({
        title: '¡Usuario Actualizado!',
        text: 'El usuario '+upUser.nombre+' ha sido actualizado con éxito.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });
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

  onSearchChange(): void {
    const term = this.searchTerm.trim().toLowerCase();
    if (term === '') {
      this.filteredSuggestions = [];
      this.showSuggestions = false;
      return;
    }
    

    this.filteredSuggestions = this.users
      .filter(user => 
        user.nombre.toLowerCase().includes(term) ||
        user.correo.toLowerCase().includes(term) ||
        user.celular.toLowerCase().includes(term)
      )
      .map(user => `${user.nombre}`);
    
    this.showSuggestions = this.filteredSuggestions.length > 0;
    this.selectedSuggestionIndex = -1;
  }

  onFocus(): void {
    this.showSuggestions = true;
    this.filterUsersBySearch();
  }
  
  onBlur(): void {
    setTimeout(() => {
      this.showSuggestions = false;
    }, 200); // El retraso de 200 ms permite seleccionar sugerencias
  }
  

onKeyDown(event: KeyboardEvent): void {
  const suggestionsLength = this.filteredSuggestions.length;

  if (event.key === 'ArrowDown') {
    // ↓ Mover abajo
    event.preventDefault();
    if (this.selectedSuggestionIndex < suggestionsLength - 1) {
      this.selectedSuggestionIndex++;
    }
  } else if (event.key === 'ArrowUp') {
    // ↑ Mover arriba
    event.preventDefault();
    if (this.selectedSuggestionIndex > 0) {
      this.selectedSuggestionIndex--;
    }
  } else if (event.key === 'Enter') {
    // ENTER para seleccionar
    if (this.selectedSuggestionIndex >= 0 && this.selectedSuggestionIndex < suggestionsLength) {
      this.selectSuggestion(this.filteredSuggestions[this.selectedSuggestionIndex]);
    }
  }
  if (event.key === 'Enter') {
    this.showSuggestions = false;
  }
}
  
  selectSuggestion(value: string): void {
    this.searchTerm = value;
    this.showSuggestions = false;
    this.filterUsersBySearch();
  }
  
  filterUsersBySearch(): void {
    const term = this.searchTerm.toLowerCase().trim();
  
    if (!term) {
      this.FiltrarUsuarios();
      this.showSuggestions = false;
      return;
    }
  
    this.userAdmin = this.users.filter(u =>
      u.usuarioTipo === 'admin' && (
        u.nombre.toLowerCase().includes(term) ||
        u.correo.toLowerCase().includes(term) ||
        u.celular.toLowerCase().includes(term)
      )
    );
  
    this.userscommon = this.users.filter(u =>
      u.usuarioTipo === 'user' && (
        u.nombre.toLowerCase().includes(term) ||
        u.correo.toLowerCase().includes(term) ||
        u.celular.toLowerCase().includes(term)
      )
    );
  
    this.showSuggestions = false;
  }

  onInputChange(): void {
    const term = this.searchTerm.trim().toLowerCase();
  
    // Filtra las sugerencias para el autocompletado
    this.filteredSuggestions = this.users
      .map(user => user.nombre)
      .filter(name => name.toLowerCase().includes(term));
  
    // Filtra los usuarios que coincidan con el término de búsqueda
    this.userAdmin = this.users.filter(u =>
      u.usuarioTipo === 'admin' && (
        u.nombre.toLowerCase().includes(term) ||
        u.correo.toLowerCase().includes(term) ||
        u.celular.toLowerCase().includes(term)
      )
    );
  
    this.userscommon = this.users.filter(u =>
      u.usuarioTipo === 'user' && (
        u.nombre.toLowerCase().includes(term) ||
        u.correo.toLowerCase().includes(term) ||
        u.celular.toLowerCase().includes(term)
      )
    );
  
    // Mostrar sugerencias si hay resultados
    this.showSuggestions = this.filteredSuggestions.length > 0;
  
    // Resetea el índice de sugerencias seleccionadas
    this.selectedSuggestionIndex = -1;
  }

  confirmDeleteUser(email: string): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esto eliminará al usuario',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Llama a la lógica de eliminación si el usuario confirma
        console.log(email);
        this.eliminarUsuario(email);  // Invocar correctamente la función
      }
    });
  }
  
  async eliminarUsuario(email: string): Promise<void> {
    try {
      this.isLoading = true;
  
      // Suscribirse al observable devuelto por deleteUser
      await this.adminUserService.deleteUser(email).toPromise();
      this.adminUserService.clearCache();
      this.loadUsers(); // Recargar usuarios después de eliminar
      this.closeModal(); // Cerrar el modal
      Swal.fire({
        title: '¡Eliminado!',
        text: 'El usuario con el correo '+email+' ha sido eliminado con éxito.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });
      this.isLoading = false;
    } catch (er) {
      this.isLoading = false;
      this.closeModal(); // Cerrar el modal incluso en caso de error
      if (er instanceof Error) {
        this.errorMessage = `Error: ${er.message}`;
      } else if (typeof er === 'string') {
        this.errorMessage = er;
      } else {
        this.errorMessage = 'Error desconocido durante la eliminación.';
      }
      this.error = true;
      console.error('Error capturado:', er);
    }
  }
  
}