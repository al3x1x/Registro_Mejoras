import { Component, OnInit } from '@angular/core';
import { EjecucionPlaneacionService } from '../../services/ejecucion-planeacion.service';
import { InfoGeneralService } from '../../services/info-general.service';
import { SeguimientoService } from '../../services/seguimiento.service';

@Component({
  selector: 'app-vista-seguimiento-mejora',
  templateUrl: './vista-seguimiento-mejora.component.html',
  styleUrls: ['./vista-seguimiento-mejora.component.css']
})
export class VistaSeguimientoMejoraComponent implements OnInit {

  info: any;
  seguimiento: any;
  detalleId: any;
  plan: any;

  constructor(
    private infoService: InfoGeneralService,
    private planeacionService: EjecucionPlaneacionService,
    private auth: SeguimientoService
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
        this.seguimiento = ordenData;
        console.log('Seguimiento: ', this.seguimiento)
      })
  }

  capturarId(id: any){
    for(let i=0; i<=this.seguimiento.length; i++){
      let dato= this.seguimiento[i].infoGeneralId.id
      if(dato===id){
        this.detalleId=[this.seguimiento[i]]
        console.log('detalleID: ',this.detalleId)
      }
    }
  }

}
