import { Component, ChangeDetectorRef } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from "./sidebar/sidebar.component";
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterModule, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  isSidebarHidden = false;
  hiddenRoutes = ['/login', '/recovery1', '/recovery2'];
  title = 'SmartGreenAngular';

  constructor(private router: Router, private cdRef: ChangeDetectorRef) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        setTimeout(() => {
          this.isSidebarHidden = this.hiddenRoutes.some(route => event.urlAfterRedirects.startsWith(route));
          this.cdRef.detectChanges(); // Forzar actualización
        });
      }
    });
  }
}
