import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('../app/modules/login-registration/login-registration.module').then((m) => m.LoginRegistrationModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('../app/modules/dashboard/dashboard.module').then((m) => m.DashboardModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'employees',
    loadChildren: () =>
      import('../app/modules/employee-profile/employee-profile.module').then((m) => m.EmployeeProfileModule),
    canLoad: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
