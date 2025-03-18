import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from "./sidebar/sidebar.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, RouterModule, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'SmartGreenAngular';
}
