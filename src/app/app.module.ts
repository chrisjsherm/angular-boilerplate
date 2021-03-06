import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AngularMaterialReExportModule } from './angular-material/angular-material-re-export.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SnackbarFailureComponent } from './atoms/snackbar-failure/snackbar-failure.component';
import { SnackbarSuccessComponent } from './atoms/snackbar-success/snackbar-success.component';
import { DeleteHeroDialogComponent } from './dialogs/delete-hero-dialog/delete-hero-dialog.component';
import { DeleteHeroDialogEffects } from './dialogs/delete-hero-dialog/redux/delete-hero-dialog.effects';
import { ListTableComponent } from './molecules/list-table/list-table.component';
import { HeroFormComponent } from './organisms/hero-form/hero-form.component';
import { ScannerComponent } from './organisms/scanner/scanner.component';
import { CreatePageComponent } from './pages/create-page/create-page.component';
import { SubmitCreateFormEffects } from './pages/create-page/redux/effects/submit-create-form.effects';
import { DetailPageComponent } from './pages/detail-page/detail-page.component';
import { DeleteHeroEffects } from './pages/detail-page/redux/effects/delete-hero.effects';
import { FetchDetailPageDataEffects } from './pages/detail-page/redux/effects/fetch-detail-page-data.effects';
import { EditPageComponent } from './pages/edit-page/edit-page.component';
import { FetchEditPageDataEffects } from './pages/edit-page/redux/effects/fetch-edit-page-data.effects';
import { SubmitEditFormEffects } from './pages/edit-page/redux/effects/submit-edit-form.effects';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { FetchListPageDataEffects } from './pages/list-page/redux/effects/fetch-list-page-data.effects';
import { ScanPageComponent } from './pages/scan-page/scan-page.component';
import { reducers } from './redux/reducers/app.action-reducer-map';

/**
 * Base module for the entire application
 */
@NgModule({
  declarations: [
    AppComponent,
    ListPageComponent,
    ListTableComponent,
    DetailPageComponent,
    EditPageComponent,
    SnackbarSuccessComponent,
    SnackbarFailureComponent,
    CreatePageComponent,
    HeroFormComponent,
    DeleteHeroDialogComponent,
    ScannerComponent,
    ScanPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularMaterialReExportModule,
    LayoutModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([
      DeleteHeroDialogEffects,
      DeleteHeroEffects,
      FetchDetailPageDataEffects,
      FetchEditPageDataEffects,
      FetchListPageDataEffects,
      SubmitCreateFormEffects,
      SubmitEditFormEffects,
    ]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
