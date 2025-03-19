import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recovery2',
  imports: [],
  templateUrl: './recovery2.component.html',
  styleUrl: './recovery2.component.css'
})
export class Recovery2Component {

  constructor (private router: Router){}

  backToLogin()
  {
    this.router.navigate(['login']);
  }
}
