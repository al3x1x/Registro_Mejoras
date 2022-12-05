import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InfoGeneralComponent } from './co/ada/components/info-general/info-general.component';
import { EvaluacionMejoraComponent } from './co/ada/components/evaluacion-mejora/evaluacion-mejora.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlaneacionEjecucionComponent } from './co/ada/components/planeacion-ejecucion/planeacion-ejecucion.component';
import { DofaComponent } from './co/ada/components/dofa/dofa.component';
import { HttpClientModule } from '@angular/common/http';
import { PlanMejoraOrganizacionalComponent } from './co/ada/components/plan-mejora-organizacional/plan-mejora-organizacional.component';
import { SeguimientoMejoraComponent } from './co/ada/components/seguimiento-mejora/seguimiento-mejora.component';
import { EvaluacionImplementacionComponent } from './co/ada/components/evaluacion-implementacion/evaluacion-implementacion.component';
import { VistaPlaneacionEjecucionComponent } from './co/ada/components/vista-planeacion-ejecucion/vista-planeacion-ejecucion.component';
import { NavbarComponent } from './co/ada/components/navbar/navbar.component';
import { VistaSeguimientoMejoraComponent } from './co/ada/components/vista-seguimiento-mejora/vista-seguimiento-mejora.component';
import localePy from '@angular/common/locales/es';
import {registerLocaleData} from '@angular/common';
import { VistaEvaluacionImplementacionComponent } from './co/ada/components/vista-evaluacion-implementacion/vista-evaluacion-implementacion.component';
registerLocaleData(localePy, 'es');



@NgModule({
  declarations: [
    AppComponent,
    EvaluacionMejoraComponent,
    PlaneacionEjecucionComponent,
    InfoGeneralComponent,
    DofaComponent,
    PlanMejoraOrganizacionalComponent,
    SeguimientoMejoraComponent,
    EvaluacionImplementacionComponent,
    VistaPlaneacionEjecucionComponent,
    NavbarComponent,
    VistaSeguimientoMejoraComponent,
    VistaEvaluacionImplementacionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],

  providers: [ { provide: LOCALE_ID, useValue: 'es' } ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
