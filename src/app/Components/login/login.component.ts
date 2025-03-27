import { Component } from '@angular/core';
import { UserService } from '../../Services/user.service';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-login',
  imports: [FormsModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  correo = '';
  password = '';

 
}