import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DofaComponent } from './co/ada/components/dofa/dofa.component';
import { EvaluacionImplementacionComponent } from './co/ada/components/evaluacion-implementacion/evaluacion-implementacion.component';
import { EvaluacionMejoraComponent } from './co/ada/components/evaluacion-mejora/evaluacion-mejora.component';
import { InfoGeneralComponent } from './co/ada/components/info-general/info-general.component';
import { NavbarComponent } from './co/ada/components/navbar/navbar.component';
import { PlanMejoraOrganizacionalComponent } from './co/ada/components/plan-mejora-organizacional/plan-mejora-organizacional.component';
import { PlaneacionEjecucionComponent } from './co/ada/components/planeacion-ejecucion/planeacion-ejecucion.component';
import { SeguimientoMejoraComponent } from './co/ada/components/seguimiento-mejora/seguimiento-mejora.component';
import { VistaEvaluacionImplementacionComponent } from './co/ada/components/vista-evaluacion-implementacion/vista-evaluacion-implementacion.component';
import { VistaPlaneacionEjecucionComponent } from './co/ada/components/vista-planeacion-ejecucion/vista-planeacion-ejecucion.component';
import { VistaSeguimientoMejoraComponent } from './co/ada/components/vista-seguimiento-mejora/vista-seguimiento-mejora.component';

const routes: Routes = [
  {path:'', component: PlanMejoraOrganizacionalComponent},
  {path:'plan-mejora-organizacional', component: PlanMejoraOrganizacionalComponent},
  {path:'seguimiento-mejora', component: VistaSeguimientoMejoraComponent},
  {path:'evaluacion-implementacion', component: VistaEvaluacionImplementacionComponent},

  {path:'info-general', component: InfoGeneralComponent},
  {path:'evaluacion-mejora/:id', component: EvaluacionMejoraComponent},
  {path:'seguimiento-mejora/:id', component: SeguimientoMejoraComponent},
  {path:'navbar', component: NavbarComponent},
  {path:'planeacion-ejecucion/:id', component: PlaneacionEjecucionComponent},
  {path:'vista-planeacion-ejecucion', component: VistaPlaneacionEjecucionComponent},
  {path:'plan-mejora-organizacional', component: PlanMejoraOrganizacionalComponent},
  {path:'evaluacion-implementacion/:id', component: EvaluacionImplementacionComponent},
  {path:'dofa/:id', component: DofaComponent},
  {path: '**', pathMatch: 'full', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
