import { Component } from '@angular/core';

@Component({
  selector: 'app-reg-usuario',
  imports: [],
  templateUrl: './reg-usuario.component.html',
  styleUrl: './reg-usuario.component.css'
})
export class RegUsuarioComponent {


  Back(): void {
    window.history.back();
  }
}
