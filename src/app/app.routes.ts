import { Routes } from '@angular/router';
import { AuthComponent } from './layouts/auth/auth.component';
import { authGuard, blockAuthGuard } from './layouts/auth/auth.guard';

export const routes: Routes = [
  // Using standalone components
  {
    path: 'auth/:mode',
    canActivate: [blockAuthGuard],
    component: AuthComponent,
  },

  // Using NgMOdules components
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./modules/dashboard/dashboard.module').then(
        (n) => n.DashboardModule
      ),
  },
  { path: '**', redirectTo: '/dashboard/users' },
];
