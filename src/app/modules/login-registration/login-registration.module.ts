import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRegistrationRoutingModule } from './login-registration-routing.module';
import { SharedModule } from '../shared/shared.module';

import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { FormComponent } from './components/form/form.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, FormComponent],
  imports: [CommonModule, LoginRegistrationRoutingModule, SharedModule],
})
export class LoginRegistrationModule {}
