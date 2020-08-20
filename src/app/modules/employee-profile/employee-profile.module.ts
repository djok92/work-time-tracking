import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeProfileRoutingModule } from './employee-profile-routing.module';
import { EmployeeProfileComponent } from './pages/employee-profile/employee-profile.component';
import { EmployeeProfileActionsComponent } from './components/employee-profile-actions/employee-profile-actions.component';
import { SharedModule } from '../shared/shared.module';
import { EmployeeProfileChangeStatusComponent } from './components/employee-profile-change-status/employee-profile-change-status.component';
import { EmployeeProfileActivityComponent } from './components/employee-profile-activity/employee-profile-activity.component';

@NgModule({
  declarations: [
    EmployeeProfileComponent,
    EmployeeProfileActionsComponent,
    EmployeeProfileChangeStatusComponent,
    EmployeeProfileActivityComponent
  ],
  imports: [CommonModule, EmployeeProfileRoutingModule, SharedModule]
})
export class EmployeeProfileModule {}
