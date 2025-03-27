import { Component } from '@angular/core';
import { ServicesInvService } from '../../Services/services-inv.service';

@Component({
  selector: 'app-registrar-invernadero',
  templateUrl: './registrar-invernadero.component.html',
  styleUrls: ['./registrar-invernadero.component.css']
})
export class RegistrarInvernaderoComponent {
  invernadero = { id: '', tipo: '' };

  constructor(private invService: ServicesInvService) {}

  // Función para registrar el invernadero
  registrarInvernadero() {
    this.invService.verificarInvernaderoPorEmail(this.invernadero.id).subscribe(response => {
      if (response) {
        alert('ID ocupada, por favor ingrese otra');
      } else {
        this.invService.registrarInvernadero(this.invernadero).subscribe(
          (res) => {
            alert('Invernadero registrado correctamente');
          },
          (error) => {
            alert('Error al registrar el invernadero');
            console.error(error);
          }
        );
      }
    });
  }
}