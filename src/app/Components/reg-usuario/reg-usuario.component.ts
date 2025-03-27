import { Component } from '@angular/core';
import { ServicesUsuService } from '../../Services/services-usu.service';


@Component({
  selector: 'app-reg-usuario',
  templateUrl: './reg-usuario.component.html',
  styleUrls: ['./reg-usuario.component.css']
})
export class RegUsuarioComponent {
  usuario = { tipo: '', nombre: '', celular: '', correo: '', contrasena: '', confirmarContrasena: '' };

  constructor(private usuService: ServicesUsuService) {}

  // Función para registrar el usuario
  registrarUsuario() {
    // Verifica si el correo ya está registrado
    this.usuService.verificarUsuarioPorCorreo(this.usuario.correo).subscribe(response => {
      if (response) {
        alert('Correo ya registrado, por favor ingrese otro');
      } else {
        // Si el correo no está registrado, realiza el registro
        this.usuService.registrarUsuario(this.usuario).subscribe(
          (res) => {
            alert('Usuario registrado correctamente');
          },
          (error) => {
            alert('Error al registrar el usuario');
            console.error(error);
          }
        );
      }
    });
  }
}