import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { EjecucionPlaneacionService } from '../../services/ejecucion-planeacion.service';
import { InfoGeneralService } from '../../services/info-general.service';
import { SeguimientoService } from '../../services/seguimiento.service';

@Component({
  selector: 'app-seguimiento-mejora',
  templateUrl: './seguimiento-mejora.component.html',
  styleUrls: ['./seguimiento-mejora.component.css']
})
export class SeguimientoMejoraComponent implements OnInit {

  info: any;
  plan: any;
  seguimiento: any;
  form!: FormGroup;
  idParametro!: number;
  index: number=1;

  constructor(
    private infoService: InfoGeneralService,
    private authPlaneacion: EjecucionPlaneacionService,
    private auth: SeguimientoService,
    private fb: FormBuilder,
    private ruta: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.ruta.params.subscribe((res: any) => {
      this.idParametro = res?.id
      console.log('respuesta:  ', this.idParametro)
    })
    this.listaInfo();
    this.listarPlaneacion();
    this.listar();


      this.form = this.fb.group({
        fecha_inicio: ["", Validators.required],
        fecha_final: ["", Validators.required],
        efectividad: ["", Validators.required],
        listado: ["", Validators.required],
        comentarios: [""],
        ruta: [""],
        descripcion: ["", Validators.required],
        responsable: ["", Validators.required],
      });


  }


  get fechaInicioValid() {
    return this.form.get('fecha_inicio')?.invalid && this.form.get('fecha_inicio')?.touched
  }
  get fechaFinalValid() {
    return this.form.get('fecha_final')?.invalid && this.form.get('fecha_final')?.touched
  }
  get efectividad() {
    return this.form.get('efectividad')?.invalid && this.form.get('efectividad')?.touched
  }
  get listadoInvalid(){
    return this.form.get('listado')?.invalid && this.form.get('listado')?.touched
  }
  get rutaInvalid(){
    return this.form.get('ruta')?.invalid && this.form.get('ruta')?.touched
  }
  get responsableInvalid(){
    return this.form.get('responsable')?.invalid && this.form.get('responsable')?.touched
  }


  listaInfo() {
    this.infoService.listar().subscribe(
      (data: any) => {
        this.info = data;
        console.log('info general: ', this.info)
      })
  }

  listarPlaneacion(){
    this.authPlaneacion.listar().subscribe(
      (data: any) => {
        this.plan = data;
        console.log('planeacion-ejecucion: ', this.plan)
      })
  }

  listar(){
    this.auth.listar().subscribe(
      (data: any) => {
        this.seguimiento = data;
        console.log('seguimiento: ', this.seguimiento)
      })
  }




  Arreglo() {

    let id = +this.idParametro
    let maeInfoGeneral = {
      id
    }

    let maePlaneacionejecucion={
      id
    }

    let arreglo = {};
    let fechaInicio = this.form.get('fecha_inicio')?.value
    let fechaFinal = this.form.get('fecha_final')?.value 
    let efectividadSeguimiento = this.form.get('efectividad')?.value 
    let listaActividades = this.form.get('listado')?.value 
    let responsableActividad = this.form.get('responsable')?.value 
    let ruta = this.form.get('ruta')?.value 
    let comentarios = this.form.get('comentarios')?.value 


    arreglo = {
      maeInfoGeneral,
      maePlaneacionejecucion,
      fechaInicio,
      fechaFinal,
      efectividadSeguimiento,
      listaActividades,
      responsableActividad,
      ruta,
      comentarios
    } 
    return arreglo;
  }


  guardar(){
    let arreglo= this.Arreglo();
    console.log(arreglo)

    this.auth.guardar(arreglo).subscribe(
      (data: any): void => {
        Swal.fire({
          icon: 'success',
          text: 'Datos guardados correctamente',
          title: 'Se guardaron los datos exitosamente',
        });
        this.listar();
        this.router.navigate(["/evaluacion-implementacion/", this.idParametro])
        // console.log('Datos guardados: ',this.listar)
      }, err => {
        Swal.fire("Error", err.error.message, "error");
      });
    }   
}