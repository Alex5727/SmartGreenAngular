import { Component } from '@angular/core';
import { AuthServiceService } from '../../Services/auth-service.service';
import { InvernaderoRegistrarService } from '../../Services/invernadero-registrar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar-invernadero',
  templateUrl: './registrar-invernadero.component.html',
  styleUrls: ['./registrar-invernadero.component.css']
})
export class RegistrarInvernaderoComponent {
  
  idInvernadero: string = '';
  tipoInvernadero: string = '';
  mensajeError: string = '';

  constructor(
    private auth: AuthServiceService,
    private invernaderoService: InvernaderoRegistrarService,
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

  registerInvernadero(): void {
    if (!this.idInvernadero || this.tipoInvernadero === 'Tipo') {
      this.mensajeError = 'Por favor, ingrese un ID válido y seleccione un tipo de invernadero.';
      return;
    }

    this.mensajeError = '';

    // Verificar si el ID del invernadero ya existe
    this.invernaderoService.verificarInvernadero(this.idInvernadero).subscribe({
      next: (data) => {
        if (data) {
          this.mensajeError = 'Este invernadero ya está registrado.';
        } else {
          // Proceder con el registro
          this.invernaderoService.registrarInvernadero(this.idInvernadero, this.tipoInvernadero).subscribe({
            next: () => {
              alert('Invernadero registrado con éxito.');
              this.router.navigate(['/menu-invernaderos']);
            },
            error: (err) => {
              console.error('Error al registrar el invernadero:', err);
              this.mensajeError = 'Hubo un error al registrar el invernadero.';
            }
          });
        }
      },
      error: (err) => {
        console.error('Error al verificar el invernadero:', err);
        this.mensajeError = 'Hubo un error al verificar el invernadero.';
      }
    });
  }
}