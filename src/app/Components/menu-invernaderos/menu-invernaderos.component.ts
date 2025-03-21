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
  invern: Inver[] = [
    new Inver("Icons/planta2.png", "ABV78f", "N/A"),
    new Inver('Icons/planta2.png', 'ABV78f', 'N/A'),
    new Inver('Icons/planta2.png', 'ABV78f', 'N/A'),
    new Inver('Icons/planta2.png', 'ABV78f', 'N/A'),
    new Inver('Icons/planta2.png', 'ABV78f', 'N/A'),
    new Inver('Icons/planta2.png', 'ABV78f', 'N/A'),
  ];
  
    constructor(private invernaderosServiceService: InvernaderosServiceService) {}
  
/*
    loadUsers(): void {
      this.invernaderosServiceService.getInvers().subscribe((data) => {
        this.invern = data;
      });
    };
*/
GoToAdd(): void {
  window.location.href = '/registrar-invernadero';

  }
}
