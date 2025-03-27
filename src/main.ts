import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { appRouterProviders } from './app/app.routes';
import { importProvidersFrom } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { InvernaderosServiceService } from './app/Services/invernaderos-service.service';
import { HttpClientModule } from '@angular/common/http';


bootstrapApplication(AppComponent, {providers: [appRouterProviders, provideHttpClient(), provideHttpClient(), InvernaderosServiceService,  importProvidersFrom(HttpClientModule, BrowserAnimationsModule, RouterModule)]})
  .catch((err) => console.error(err));
