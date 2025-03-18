import { TableModule } from 'primeng/table';
import { User } from '../models/user.model';
import { DialogService } from 'primeng/dynamicdialog';
import { AdminUserService } from '../services/admin-user.service';
import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
//import { SiderbarComponent } from '../../siderbar/siderbar.component';

@Component({
  selector: 'app-admin-cuentas',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, DialogModule, DropdownModule, FormsModule, ReactiveFormsModule],
  providers: [DialogService],
  templateUrl: './admin-cuentas.component.html',
  animations: [
    trigger('fadeInOut',[
      state('void', style({
        opacity: 0
      })),
      transition(':enter', [
        animate('500ms 0s ease-in')
      ]),
      transition(':leave', [
        animate('500ms 0s ease-out', style({
          opacity: 0
        }))
      ])
    ])
  ],
  styleUrl: './admin-cuentas.component.css'
})
export class AdminCuentasComponent {
  displayDialog: boolean = false;
  users: User[] = [];
  userAdmin: User[] = [];
  userscommon: User[] = [];
  userForm!: FormGroup;
  isEditting: boolean = false;
  userType = ['admin', 'user'];

  constructor(private adminUserService: AdminUserService, private formBuildr: FormBuilder) { }
  ngOnInit(){
    this.userForm = this.formBuildr.group({
      id: [null],
      correo: ['', Validators.required],
      nombre: ['', Validators.required],
      celular: ['', Validators.required],
      password: ['', Validators.required],
      usuarioTipo: ['', Validators.required]
    });
    this.loadUsers();
  }
  openDialog(user?:any) 
  {
    this.displayDialog = true;
    this.isEditting = user;
    if(user){
      this.userForm.patchValue(user);
    } else {
      this.userForm.reset;
    }
  }

  loadUsers() {
    this.adminUserService.getUsers().subscribe((data) => {
      this.users = data;
      console.log(data);
      this.userAdmin = this.users.filter((user) => user.usuarioTipo === 'admin');
      this.userscommon = this.users.filter((user) => user.usuarioTipo === 'user');
    });
  }

  saveUser(){

  }
}
