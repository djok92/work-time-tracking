import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [],
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule],
  exports: [CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule]
})
export class MaterialModule {}
