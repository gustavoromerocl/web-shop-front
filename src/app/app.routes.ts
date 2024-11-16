import { Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard'; // Asegúrate de importar el guard
import { BaseLayoutComponent } from './layout/base-layout/base-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./pages/home/home.component').then((m) => m.HomeComponent),
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./pages/login/login.component').then((m) => m.LoginComponent),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./pages/profile/profile.component').then((m) => m.ProfileComponent),
        canActivate: [AuthGuard], //Ruta protegida por AuthGuard
      },
    ],
  },
  { path: '**', redirectTo: 'home' }, // Redirige cualquier otra ruta a home
];
