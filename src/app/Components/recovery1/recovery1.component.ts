import { routes } from './../../app.routes';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recovery1',
  imports: [],
  templateUrl: './recovery1.component.html',
  styleUrl: './recovery1.component.css'
})
export class Recovery1Component {

  constructor(private router: Router){}

  toRecovery2(){
    this.router.navigate(['/recovery2']);
  }

}
