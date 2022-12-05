import { Component, OnInit } from '@angular/core';
import { EjecucionPlaneacionService } from '../../services/ejecucion-planeacion.service';
import { EvaluacionImplServiceService } from '../../services/evaluacion-impl-service.service';
import { InfoGeneralService } from '../../services/info-general.service';

@Component({
  selector: 'app-vista-evaluacion-implementacion',
  templateUrl: './vista-evaluacion-implementacion.component.html',
  styleUrls: ['./vista-evaluacion-implementacion.component.css']
})
export class VistaEvaluacionImplementacionComponent implements OnInit {

 
  info: any;
  evaluacionImpl: any;
  detalleId: any;
  plan: any;

  constructor(
    private infoService: InfoGeneralService,
    private planeacionService: EjecucionPlaneacionService,
    private auth: EvaluacionImplServiceService
  ) { }

  ngOnInit(): void {
    this.listaInfo();
    this.listarSeguimiento();
    this.listarPlaneacion();

  }

  listaInfo() {
    this.infoService.listar().subscribe(
      (data: any) => {
        this.info = data;
        // console.log('titulo: ', this.info)
      })
  }

  listarPlaneacion(){
    this.planeacionService.listar().subscribe(
      (data: any) => {    
        this.plan = data;
        console.log('planeacion-ejecucion: ', this.plan)
      })
  }


  listarSeguimiento() {
    this.auth.listar().subscribe(
      (data: any) => {
        let ordenData = data.sort((a: any , b: any) => {
          return a.id - b.id;
        });
        this.evaluacionImpl = ordenData;
        console.log('Evaluacion Impl: ', this.evaluacionImpl)
      })
  }

  capturarId(id: any){
    for(let i=0; i<=this.evaluacionImpl.length; i++){
      let dato= this.evaluacionImpl[i].infoGeneralId.id
      if(dato===id){
        this.detalleId=[this.evaluacionImpl[i]]
        console.log('detalleID: ',this.detalleId)
      }
    }
  }

}
