import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { appRouterProviders } from './app/app.routes';
import { importProvidersFrom } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { LoginServiceService } from './app/Services/login-service.service';
import { InvernaderosServiceService } from './app/Services/invernaderos-service.service';
import { AuthServiceService } from './app/Services/auth-service.service';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

bootstrapApplication(AppComponent, {providers: [appRouterProviders, 
  provideHttpClient(),  
  importProvidersFrom(BrowserAnimationsModule, RouterModule),
  provideCharts(
    withDefaultRegisterables()
  )]})
  .catch((err) => console.error(err));
