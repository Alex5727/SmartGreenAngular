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
   Mensaje !: string; 
   correo2 !: string | null;


  constructor(private invernaderosService: InvernaderosServiceService, private auth: AuthServiceService) {}

  ngOnInit(): void {

    this.convertir()
    this.obtenerInvernaderos(this.correo);
  }

   convertir(){
     this.correo2 = this.auth.getEmail();
     if (this.correo2 != null)
     {
      this.correo = this.correo2
    }
  }

  obtenerInvernaderos(correo: string) {
    this.invernaderosService.getInvers(correo).subscribe({
      next: (data) => {
        this.invernaderos = data; 

        if(this.invernaderos.length === 0)
        {
          this.Mensaje = "No hay ningun invernadero vinculado a esta cuenta";
        }

      },
      error: (err) => {
        console.error('Error al obtener invernaderos:', err);
      }
    });
  }

  
}