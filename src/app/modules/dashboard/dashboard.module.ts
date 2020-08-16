import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EmployeesSummaryComponent } from './components/employees-summary/employees-summary/employees-summary.component';
import { TableComponent } from './components/table/table/table.component';

@NgModule({
  declarations: [DashboardComponent, EmployeesSummaryComponent, TableComponent],
  imports: [CommonModule, DashboardRoutingModule, SharedModule]
})
export class DashboardModule {}
