import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { reducers } from './redux/reducers/app.action-reducer-map';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { EffectsModule } from '@ngrx/effects';
import { FetchListPageDataEffects } from './pages/list-page/redux/effects/fetch-list-page-data.effects';
import { ListTableComponent } from './molecules/list-table/list-table.component';
import { DetailPageComponent } from './pages/detail-page/detail-page.component';
import { FetchDetailPageDataEffects } from './pages/detail-page/redux/effects/fetch-detail-page-data.effects';

/**
 * Base module for the entire application
 */
@NgModule({
  declarations: [
    AppComponent,
    ListPageComponent,
    ListTableComponent,
    DetailPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    LayoutModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([
      FetchListPageDataEffects,
      FetchDetailPageDataEffects,
    ]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
