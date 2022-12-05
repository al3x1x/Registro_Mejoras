import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { EjecucionPlaneacionService } from '../../services/ejecucion-planeacion.service';
import { InfoGeneralService } from '../../services/info-general.service';

@Component({
  selector: 'app-vista-planeacion-ejecucion',
  templateUrl: './vista-planeacion-ejecucion.component.html',
  styleUrls: ['./vista-planeacion-ejecucion.component.css']
})
export class VistaPlaneacionEjecucionComponent implements OnInit {
  info: any;
  plan: any;
  form!: FormGroup;
  id!: number;
  detalleId: any;
  // index: number=1;

  constructor(
    private infoService: InfoGeneralService,
    private auth: EjecucionPlaneacionService,
  ) { }

  ngOnInit(): void {

    this.listaInfo();
    this.listarPlaneacion();
  }

  capturarId(id: any){

    for(let i=0; i<=this.plan.length; i++){
      let dato= this.plan[i].infoGeneralId.id
      if(dato===id){
        this.detalleId=[this.plan[i]]
        console.log('detalleID: ',this.detalleId)
      }
    }
  }


  listaInfo() {
    this.infoService.listar().subscribe(
      (data: any) => {
        this.info = data;
        // console.log('titulo: ', this.info)
      })
  }

  listarPlaneacion() {
    this.auth.listar().subscribe(
      (data: any) => {
        let ordenData = data.sort((a: any , b: any) => {
          return a.id - b.id;
        });
        this.plan = ordenData;
        // console.log('Planeacion y ejecucion: ', this.plan)
      })
  }

}
