import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('../app/modules/login-registration/login-registration.module').then((m) => m.LoginRegistrationModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('../app/modules/dashboard/dashboard.module').then((m) => m.DashboardModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
