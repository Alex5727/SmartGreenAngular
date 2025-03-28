import { Component } from '@angular/core';
import { AuthServiceService } from '../../Services/auth-service.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar-invernadero',
  templateUrl: './registrar-invernadero.component.html',
  styleUrls: ['./registrar-invernadero.component.css']
})
export class RegistrarInvernaderoComponent {

  constructor(private auth: AuthServiceService, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    if (!this.auth.getToken()) {
      window.location.href = '/login';
    }
  }

  Back(): void {
    window.history.back();
  }

  registerInvernadero(): void {
    const id = (document.getElementById('invernadero-id') as HTMLInputElement).value;
    const tipo = (document.getElementById('tipo-invernadero') as HTMLSelectElement).value;

    if (!id || tipo === 'Tipo') {
      alert('Por favor, ingrese un ID válido y seleccione un tipo de invernadero.');
      return;
    }

    // Verificar si el invernadero ya tiene correo asociado
    this.http.get(`https://5r1v7n94-5062.usw3.devtunnels.ms/api/Invernadero/FindByEmail/${id}`)
      .subscribe({
        next: (data) => {
          if (data) {
            alert('Este invernadero ya tiene un correo asociado.');
          } else {
            // Registrar el invernadero
            const invernadero = {
              id,
              tipo
            };
            this.http.post('https://5r1v7n94-5062.usw3.devtunnels.ms/api/Invernadero/Create', invernadero)
              .subscribe({
                next: () => {
                  alert('Invernadero registrado con éxito.');
                  this.router.navigate(['/menu-invernaderos']);
                },
                error: (err) => {
                  console.error('Error al registrar el invernadero:', err);
                  alert('Hubo un error al registrar el invernadero.');
                }
              });
          }
        },
        error: (err) => {
          console.error('Error al verificar el invernadero:', err);
          alert('Hubo un error al verificar el invernadero.');
        }
      });
  }
}