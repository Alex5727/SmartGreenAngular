import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from '../app.routes';

@Component({
  selector: 'app-siderbar',
  imports: [RouterModule],
  templateUrl: './siderbar.component.html',
  styleUrl: './siderbar.component.css'
})
export class SiderbarComponent {
  public ListaDeRutas = routes
  .map(route => route ?? [])
  .flat()
  .filter(
    route => 
      route && route.path !== 'login'
      && route.path !== 'recovery1'
      && route.path !== 'recovery2'
      && route.path !== 'reg-usuario');
}
