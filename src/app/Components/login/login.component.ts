import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AyudaService } from '../../ayuda.service';
import { AuthServiceService } from '../../Services/auth-service.service';


@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
constructor (private router: Router,
private inv: AyudaService,

){}

correo !: string;
password !: string;

toRecovery1(){
  this.router.navigate(['recovery1']);
}

login(){
}

ToMenu(): void {
  window.location.href = '/menu-invernaderos';
}
}
