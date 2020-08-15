import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';

const declarations = [];
const imports = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  HttpClientModule,
  RouterModule,
  MaterialModule,
];

@NgModule({
  declarations: [],
  imports: [...imports],
  exports: [...imports, ...declarations],
})
export class SharedModule {}
