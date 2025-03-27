import { Routes, provideRouter } from '@angular/router';
import { MenuInvernaderosComponent } from './Components/menu-invernaderos/menu-invernaderos.component';
import { LoginComponent } from './Components/login/login.component';
import { RegistrarInvernaderoComponent } from './Components/registrar-invernadero/registrar-invernadero.component';
import { RegUsuarioComponent } from './Components/reg-usuario/reg-usuario.component';
import { Recovery1Component } from './Components/recovery1/recovery1.component';
import { Recovery2Component } from './Components/recovery2/recovery2.component';
import { EstadisticasComponent } from './Components/estadisticas/estadisticas.component';
import { AdminCuentasComponent } from './Components/admin-cuentas/admin-cuentas.component';
export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'menu-invernaderos', component: MenuInvernaderosComponent},
    {path: 'registrar-invernadero', component: RegistrarInvernaderoComponent},
    {path: 'reg-usuario', component: RegUsuarioComponent},
    {path: 'recovery1', component: Recovery1Component},
    {path: 'recovery2', component: Recovery2Component},
    {path: 'estadisticas', component: EstadisticasComponent},
    {path: 'admin-cuentas', component: AdminCuentasComponent},
    {path: '**', redirectTo: '/login', pathMatch: 'full'}
];

export const appRouterProviders = [provideRouter(routes)];
