import { Component } from '@angular/core';
import { AuthServiceService } from '../../Services/auth-service.service';

@Component({
  selector: 'app-registrar-invernadero',
  imports: [],
  templateUrl: './registrar-invernadero.component.html',
  styleUrl: './registrar-invernadero.component.css'
})
export class RegistrarInvernaderoComponent {

  constructor(private auth: AuthServiceService) {}
  ngOnInit(): void {

    if (!this.auth.getToken())
    {
      window.location.href = '/login';
    }
  }
  
  Back(): void {
    window.history.back();
  }

}
