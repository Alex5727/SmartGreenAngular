import { Component } from '@angular/core';
import { AuthServiceService } from '../../Services/auth-service.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reg-usuario',
  templateUrl: './reg-usuario.component.html',
  styleUrls: ['./reg-usuario.component.css']
})
export class RegUsuarioComponent {

  constructor(private auth: AuthServiceService, private http: HttpClient, private router: Router) {}

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
      tipo: (document.getElementById('tipo-usuario') as HTMLSelectElement).value,
      nombre: (document.getElementById('nombre-usuario') as HTMLInputElement).value,
      celular: (document.getElementById('celular-usuario') as HTMLInputElement).value,
      correo: (document.getElementById('correo-usuario') as HTMLInputElement).value,
      contrasena: (document.getElementById('contrasena-usuario') as HTMLInputElement).value,
      confirmarContrasena: (document.getElementById('confirmar-usuario') as HTMLInputElement).value
    };

    // Validar las contraseñas coinciden
    if (usuario.contrasena !== usuario.confirmarContrasena) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    // Llamar al servicio para registrar el usuario
    this.http.post('https://5r1v7n94-5062.usw3.devtunnels.ms/api/User/Register', usuario)
      .subscribe({
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