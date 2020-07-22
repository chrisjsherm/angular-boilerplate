import { NgModule } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

/**
 * Export used Angular Material modules so we only need a single import in
 * app.module.ts
 */
@NgModule({
  exports: [MatCheckboxModule, MatTableModule, MatProgressSpinnerModule],
})
export class AngularMaterialModule {}
