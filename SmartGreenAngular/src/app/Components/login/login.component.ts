import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginServiceService } from '../../Services/login-service.service';
import { FormsModule } from '@angular/forms'; 


@Component({
  selector: 'app-login',
  imports: [ FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
constructor (private router: Router,
public loginSer: LoginServiceService,

){}

correo : string = '';
password : string = '';
msj !: string;

ngOnInit(): void {

  this.msj = this.loginSer.msgUser;
}


toRecovery1(): void{
  this.router.navigate(['recovery1']);
}

login(){

  this.loginSer.login(this.correo, this.password);

}

ToMenu(): void {
  window.location.href = '/menu-invernaderos';
}




}
