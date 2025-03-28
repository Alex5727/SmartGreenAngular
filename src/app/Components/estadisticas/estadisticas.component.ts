import { Component } from '@angular/core';
import { AuthServiceService } from '../../Services/auth-service.service';

@Component({
  selector: 'app-estadisticas',
  imports: [],
  templateUrl: './estadisticas.component.html',
  styleUrl: './estadisticas.component.css'
})
export class EstadisticasComponent {
  constructor(private auth: AuthServiceService) {}
  ngOnInit(): void {

    if (!this.auth.getToken())
    {
      window.location.href = '/login';
    }
  }
}
