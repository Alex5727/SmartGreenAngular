import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-carta-planta',
  imports: [],
  templateUrl: './carta-planta.component.html',
  styleUrl: './carta-planta.component.css'
})

export class CartaPlantaComponent {
  @Input() imageSrc: string = '';
  @Input() title: string = '';
  @Input() owner: string = '';

}
