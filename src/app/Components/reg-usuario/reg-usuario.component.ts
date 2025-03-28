import { Component } from '@angular/core';
import { AuthServiceService } from '../../Services/auth-service.service';

@Component({
  selector: 'app-reg-usuario',
  imports: [],
  templateUrl: './reg-usuario.component.html',
  styleUrl: './reg-usuario.component.css'
})
export class RegUsuarioComponent {

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
