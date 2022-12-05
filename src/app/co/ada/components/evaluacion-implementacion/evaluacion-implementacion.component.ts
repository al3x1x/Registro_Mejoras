import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, ReplaySubject } from 'rxjs';
import Swal from 'sweetalert2';
import { EjecucionPlaneacionService } from '../../services/ejecucion-planeacion.service';
import { EvaluacionImplServiceService } from '../../services/evaluacion-impl-service.service';
import { InfoGeneralService } from '../../services/info-general.service';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-evaluacion-implementacion',
  templateUrl: './evaluacion-implementacion.component.html',
  styleUrls: ['./evaluacion-implementacion.component.css']
})
export class EvaluacionImplementacionComponent implements OnInit {

  info: any;
  plan: any;
  seguimiento: any;
  form!: FormGroup;
  idParametro!: number;
  estado: boolean = false;
  aplicaEficacia: boolean = true;
  value: any;
  impacto!: number;
  excel: any;
  evaluacionImpl: any;

  constructor(
    private infoService: InfoGeneralService,
    private authPlaneacion: EjecucionPlaneacionService,
    private auth: EvaluacionImplServiceService,
    private fb: FormBuilder,
    private ruta: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.ruta.params.subscribe((res: any) => {
      this.idParametro = res?.id
      console.log('respuesta:  ', this.idParametro)
    })
    this.listar();
    this.listaInfo();
    this.listarPlaneacion();
    // this.roi(this.value);
    // this.listar();


    this.form = this.fb.group({
      fecha_seguimiento: ["", Validators.required],
      fecha_inicio: ["", Validators.required],
      fecha_final: ["", Validators.required],
      objetivo: [""],
      resultado: [""],
      efectividad: ["", Validators.required],
      comentarios: [""],
      evidencia: [""],
      eficacia: ["", Validators.required],
      estado: ["", Validators.required],
      observaciones: [""],
      impacto: ["", Validators.required],

    });
  }


  get fechaSeguimientoValid() {
    return this.form.get('fecha_seguimiento')?.invalid && this.form.get('fecha_seguimiento')?.touched
  }

  get fechaInicioValid() {
    return this.form.get('fecha_inicio')?.invalid && this.form.get('fecha_inicio')?.touched
  }

  get fechaFinalValid() {
    return this.form.get('fecha_final')?.invalid && this.form.get('fecha_final')?.touched
  }
  get efectividadInvalid() {
    return this.form.get('efectividad')?.invalid && this.form.get('efectividad')?.touched
  }
  get eficaciaInvalid() {
    return this.form.get('eficacia')?.invalid && this.form.get('eficacia')?.touched
  }
  get estadoInvalid() {
    return this.form.get('estado')?.invalid && this.form.get('estado')?.touched
  }
  get impactoInvalid() {
    return this.form.get('impacto')?.invalid && this.form.get('impacto')?.touched
  }



  listaInfo() {
    this.infoService.listar().subscribe(
      (data: any) => {
        this.info = data;
        console.log('info general: ', this.info)
      })
  }

  listar() {
    this.auth.listar().subscribe(
      (data: any) => {
        this.evaluacionImpl = data;
        console.log('EvaluacionImpl: ', this.evaluacionImpl)
      })
  }

  listarPlaneacion() {
    this.authPlaneacion.listar().subscribe(
      (data: any) => {
        this.plan = data;
        console.log('planeacion-ejecucion: ', this.plan)
      })
  }

  // listar(){
  //   this.auth.listar().subscribe(
  //     (data: any) => {
  //       this.seguimiento = data;
  //       console.log('seguimiento: ', this.seguimiento)
  //     })
  // }

  event(value: any) {

    let estado = value.target.value
    let impacto = this.form.get('impacto')?.value
    this.impacto = impacto


    if (estado === 'implementada' && (impacto > 5000000)) {
      this.estado = true
      // this.impacto=impacto
      // console.log('Impacto economico": ', impacto)
    } else {
      this.estado = false
    }
  }

  aplica(value:any){
    let aplica = value.target.value
    if (aplica === 'aplica') {
      this.aplicaEficacia = true
    } else {
      this.aplicaEficacia = false
    }
  }

  roi(value: any) {

    let estado = value.target.value
    let impacto = this.form.get('impacto')?.value
    this.impacto = impacto


    if (estado === 'implementada' && (impacto > 1000000)) {
      this.estado = true
    } else {
      this.estado = false
    }
  }





  Arreglo() {

    let id = +this.idParametro
    let maeInfoGeneral = {
      id
    }

    let maePlaneacionejecucion = {
      id
    }

    let arreglo = {};
    let fechaSeguimiento = this.form.get('fecha_seguimiento')?.value
    let fechaInicioMejora = this.form.get('fecha_inicio')?.value
    let fechaCierreMejora = this.form.get('fecha_final')?.value
    let evidenciaRegistro = this.form.get('evidencia')?.value
    let aplica = this.form.get('eficacia')?.value
    let resultado = this.form.get('resultado')?.value
    let objetivoMejora = this.form.get('objetivo')?.value
    let efectividad = this.form.get('efectividad')?.value
    let estadoFinal = this.form.get('estado')?.value
    let observaciones = this.form.get('observaciones')?.value
    let impacto = this.form.get('impacto')?.value


    arreglo = {
      maeInfoGeneral,
      maePlaneacionejecucion,
      fechaSeguimiento,
      fechaInicioMejora,
      fechaCierreMejora,
      evidenciaRegistro,
      aplica,
      objetivoMejora,
      resultado,
      efectividad,
      estadoFinal,
      observaciones,
      impacto
    }
    return arreglo;
  }


  guardar() {
    let arreglo = this.Arreglo();
    console.log('arreglo guardado: ', arreglo)
      this.auth.guardar(arreglo).subscribe(
        (data: any): void => {
          Swal.fire({
            icon: 'success',
            text: 'Datos guardados correctamente',
            title: 'Se guardaron los datos exitosamente',
          });
          this.listar();
          this.form.reset(); 
        this.router.navigate(["plan-mejora-organizacional"])
          // console.log('Datos guardados: ',this.listar)
        }, err => {
          Swal.fire("Error", err.error.message, "error");
        });
  }



  async subirArchivo(event: any) {
    let archivo = event.target.files[0]
    let base64 = await this.onFileSelected(archivo)
    this.excel= base64
    console.log('excel', this.excel)
    // console.log('BASE 64... ', base64)
    // console.log(event.target.files[0])
  }

  onFileSelected(event: any) {
    return new Promise((resolve) => {
      this.convertFile(event).subscribe((base64) => {
        resolve(base64)
      })
    })
  }

  convertFile(file: File): Observable<string> {
    const result = new ReplaySubject<string>(1);
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (event: any) => result.next(window.btoa(event.target.result.toString()));
    return result;
  }
}
