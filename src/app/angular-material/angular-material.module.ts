import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

/**
 * Export used Angular Material modules so we only need a single import in
 * app.module.ts
 */
@NgModule({
  exports: [MatSidenavModule, MatToolbarModule, MatIconModule, MatListModule],
})
export class AngularMaterialModule {}
