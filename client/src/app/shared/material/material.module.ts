import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule, MatFormFieldModule, MatInputModule, MatListModule } from '@angular/material';

@NgModule({
  imports: [CommonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatListModule],
  exports: [MatCardModule, MatFormFieldModule, MatInputModule, MatListModule],
  declarations: [],
})
export class MaterialModule {}
