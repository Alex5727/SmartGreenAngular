import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SiderbarComponent } from '../../siderbar/siderbar.component';

@Component({
  selector: 'app-admin-cuentas',
  imports: [CommonModule, SiderbarComponent],
  templateUrl: './admin-cuentas.component.html',
  styleUrl: './admin-cuentas.component.css'
})
export class AdminCuentasComponent {
  ListUsers = [
    {name:'usuario1',tipo:'admin'},
    {name:'usuario2',tipo:'user'}
  ]

  adminUsers = this.ListUsers.filter(X => X.tipo == 'admin')
  normalUsers = this.ListUsers.filter(x => x.tipo == 'user')

}
