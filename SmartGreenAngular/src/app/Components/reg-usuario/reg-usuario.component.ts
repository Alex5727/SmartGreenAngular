import { Component } from '@angular/core';
import { AuthServiceService } from '../../Services/auth-service.service';
import { UsuarioRegistrarService } from '../../Services/usuario-registrar.service'; // Importar servicio
import { Router } from '@angular/router';

@Component({
  selector: 'app-reg-usuario',
  templateUrl: './reg-usuario.component.html',
  styleUrls: ['./reg-usuario.component.css']
})
export class RegUsuarioComponent {

  constructor(
    private auth: AuthServiceService,
    private usuarioRegistrarService: UsuarioRegistrarService, // Inyectar el servicio
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.auth.getToken()) {
      window.location.href = '/login';
    }
  }

  Back(): void {
    window.history.back();
  }

  registerUser(): void {
    const usuario = {
      usuarioTipo: (document.getElementById('tipo-usuario') as HTMLSelectElement).value,
      nombre: (document.getElementById('nombre-usuario') as HTMLInputElement).value,
      celular: (document.getElementById('celular-usuario') as HTMLInputElement).value,
      correo: (document.getElementById('correo-usuario') as HTMLInputElement).value,
      password: (document.getElementById('contrasena-usuario') as HTMLInputElement).value,
      confirmarContrasena: (document.getElementById('confirmar-usuario') as HTMLInputElement).value
    };

    // Validar los campos requeridos
    if (!usuario.usuarioTipo || !usuario.nombre || !usuario.celular || !usuario.correo || !usuario.password || !usuario.confirmarContrasena) {
      alert('Todos los campos son obligatorios.');
      return;
    }

    // Validar las contraseñas coinciden
    if (usuario.password !== usuario.confirmarContrasena) {
      alert('Las contraseñas no coinciden.');
      return;
    }


    // Usar el servicio para registrar el usuario
    this.usuarioRegistrarService.registerUser(usuario).subscribe({
      next: (response) => {
        alert('Usuario registrado con éxito.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Error al registrar el usuario:', err);
        alert('Hubo un error al registrar el usuario.');
      }
    });
  }
}