import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
constructor (private router: Router){}

toRecovery1(){
  this.router.navigate(['recovery1']);
}

ToMenu(): void {
  window.location.href = '/menu-invernaderos';
}
}
