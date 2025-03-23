import { Component } from '@angular/core';
import { CartaPlantaComponent } from '../carta-planta/carta-planta.component';
import { Inver } from '../../Clases/inver';
import { InvernaderosServiceService } from '../../Services/invernaderos-service.service';

@Component({
  selector: 'app-menu-invernaderos',
  imports: [CartaPlantaComponent],
  templateUrl: './menu-invernaderos.component.html',
  styleUrl: './menu-invernaderos.component.css'
})


export class MenuInvernaderosComponent {
  invernaderos: Inver[] = [
  ];

  constructor(private invernaderosService: InvernaderosServiceService) {}

  ngOnInit(): void {
    this.obtenerInvernaderos();
  }

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