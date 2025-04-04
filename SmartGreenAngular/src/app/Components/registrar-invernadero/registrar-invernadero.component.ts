import { Component } from '@angular/core';
import { AuthServiceService } from '../../Services/auth-service.service';
import { InvernaderoRegistrarService } from '../../Services/invernadero-registrar.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registrar-invernadero',
  templateUrl: './registrar-invernadero.component.html',
  styleUrls: ['./registrar-invernadero.component.css'],
  standalone: true,
  imports: [FormsModule, NgIf],
})
export class RegistrarInvernaderoComponent {
  
  idInvernadero: string = '';
  tipoInvernadero: number | null = null;
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
    if (!this.idInvernadero || this.tipoInvernadero === null) {
      this.mensajeError = 'Por favor, ingrese un ID válido y seleccione un tipo de invernadero.';
      return;
    }
  
    this.mensajeError = '';
  
    // Verificamos si ya existe el invernadero
    this.invernaderoService.verificarInvernadero(this.idInvernadero).subscribe({
      next: (existe) => {
        if (existe) {
          this.mensajeError = 'Este invernadero ya está registrado.';
        } else {
          // Procedemos a registrarlo
          this.invernaderoService.registrarInvernadero(this.idInvernadero, this.tipoInvernadero!).subscribe({
            next: () => {
              alert('Invernadero registrado con éxito.');
              this.router.navigate(['/menu-invernaderos']);
            },
            error: (err) => {
              console.error('Error al registrar el invernadero:', err);
              this.mensajeError = err.message || 'Error desconocido al registrar.';
            }
          });
        }
      },
      error: (err) => {
        console.error('Error al verificar el invernadero:', err);
        this.mensajeError = err.message || 'No se pudo verificar el invernadero.';
      }
    });
  }
}