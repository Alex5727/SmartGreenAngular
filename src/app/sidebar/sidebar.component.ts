import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { routes } from '../app.routes';
import { PrimeNG } from 'primeng/config';
import { AuthServiceService } from '../Services/auth-service.service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  constructor(private primeNG: PrimeNG, private auth: AuthServiceService) { }

  onInit() {
    this.primeNG.ripple.set(true);
  }
  public ListaDeRutas = routes
  .map(route => route ?? [])
  .flat()
  .filter(
    route =>
      route && route.path !== 'login'
      && route.path !== 'recovery1'
      && route.path !== 'recovery2'
      && route.path !== 'reg-usuario');


cerrar(){
this.auth.logout();
}


}
