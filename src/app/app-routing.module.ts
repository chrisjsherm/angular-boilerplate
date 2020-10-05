import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePageComponent } from './pages/create-page/create-page.component';
import { DetailPageComponent } from './pages/detail-page/detail-page.component';
import { EditPageComponent } from './pages/edit-page/edit-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/heroes', pathMatch: 'full' },
  { path: 'heroes', component: ListPageComponent },
  { path: 'heroes/create', component: CreatePageComponent },
  { path: 'heroes/:id', component: DetailPageComponent },
  { path: 'heroes/:id/edit', component: EditPageComponent },
  { path: '**', redirectTo: '' },
];

/**
 * Register routing for the application
 */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
