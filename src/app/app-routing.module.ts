import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component'
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { PruebasComponent } from './pruebas/pruebas.component';

const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: 'prueba', component: PruebasComponent },
  { path: '',   redirectTo: 'welcome', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }