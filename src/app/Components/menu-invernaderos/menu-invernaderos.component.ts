import { Component } from '@angular/core';
import { CartaPlantaComponent } from '../carta-planta/carta-planta.component';
import { Inver } from '../../Clases/inver';
import { InvernaderosServiceService } from '../../Services/invernaderos-service.service';
import { AuthServiceService } from '../../Services/auth-service.service';

@Component({
  selector: 'app-menu-invernaderos',
  imports: [CartaPlantaComponent],
  templateUrl: './menu-invernaderos.component.html',
  styleUrl: './menu-invernaderos.component.css'
})


export class MenuInvernaderosComponent {
  invernaderos: Inver[] = [
  ];

   correo !: string; 
   correo2 !: string | null;


  constructor(private invernaderosService: InvernaderosServiceService) {}

  ngOnInit(): void {
    this.obtenerInvernaderos();
  }

  // convertir(){
  //   this.correo2 = this.auth.getEmail();
  //   if (this.correo2 == null)
  //   {
  //     this.correo = this.correo2
  //   }
  // }


  obtenerInvernaderos() {
    this.invernaderosService.getInvers().subscribe({
      next: (data) => {
        this.invernaderos = data; 
      },
      error: (err) => {
        console.error('Error al obtener invernaderos:', err);
      }
    });
  }
}