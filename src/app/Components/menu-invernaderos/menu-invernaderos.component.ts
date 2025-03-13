import { Component } from '@angular/core';
import { CartaPlantaComponent } from '../carta-planta/carta-planta.component';
import { Inver } from '../../Clases/inver';

@Component({
  selector: 'app-menu-invernaderos',
  imports: [CartaPlantaComponent],
  templateUrl: './menu-invernaderos.component.html',
  styleUrl: './menu-invernaderos.component.css'
})


export class MenuInvernaderosComponent {


  invernadero: Inver[] = [
    new Inver("icons/planta.png", "ABV78f", "N/A"),
    new Inver('icons/planta.png', 'ABV78f', 'N/A'),
    new Inver('icons/planta.png', 'ABV78f', 'N/A'),
    new Inver('icons/planta.png', 'ABV78f', 'N/A'),
    new Inver('icons/planta.png', 'ABV78f', 'N/A'),
    new Inver('icons/planta.png', 'ABV78f', 'N/A'),
    
    ];



}
