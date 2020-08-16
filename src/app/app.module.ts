import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

import { AppComponent } from './app.component';
import { PruebasComponent } from './pruebas/pruebas.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { PruebasFileComponent } from './pruebas-file/pruebas-file.component';
import { PruebasImagenComponent } from './pruebas-imagen/pruebas-imagen.component';

//Shared
import { NavBarComponent } from './shared/nav-bar/nav-bar.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { GraficoBarraComponent } from './shared/grafico-barra/grafico-barra.component';
import { TablaExplicatibaComponent } from './shared/tabla-explicatiba/tabla-explicatiba.component';
import { TooltipExplicacionComponent } from './shared/tooltip-explicacion/tooltip-explicacion.component';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    NavBarComponent,
    PageNotFoundComponent,
    PruebasComponent,
    GraficoBarraComponent,
    TablaExplicatibaComponent,
    TooltipExplicacionComponent,
    PruebasFileComponent,
    PruebasImagenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ChartsModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
