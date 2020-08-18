import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeProfileRoutingModule } from './employee-profile-routing.module';
import { EmployeeProfileComponent } from './pages/employee-profile/employee-profile.component';
import { EmployeeProfileInformationComponent } from './components/employee-profile-information/employee-profile-information.component';
import { EmployeeProfileActionsComponent } from './components/employee-profile-actions/employee-profile-actions.component';


@NgModule({
  declarations: [EmployeeProfileComponent, EmployeeProfileInformationComponent, EmployeeProfileActionsComponent],
  imports: [
    CommonModule,
    EmployeeProfileRoutingModule
  ]
})
export class EmployeeProfileModule { }
