import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { EjecucionPlaneacionService } from '../../services/ejecucion-planeacion.service';
import { InfoGeneralService } from '../../services/info-general.service';

@Component({
  selector: 'app-planeacion-ejecucion',
  templateUrl: './planeacion-ejecucion.component.html',
  styleUrls: ['./planeacion-ejecucion.component.css']
})
export class PlaneacionEjecucionComponent implements OnInit {

  info: any;
  planeacion: any;
  form!: FormGroup;
  idParametro!: number;
  data: any[] = [];
  valor: any;
  valorDofa!: string;

  constructor(
    private infoService: InfoGeneralService,
    private fb: FormBuilder,
    private ruta: ActivatedRoute,
    private authPlaneacion: EjecucionPlaneacionService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.ruta.params.subscribe((res: any) => {
      this.idParametro = res?.id
      console.log('respuesta:  ', this.idParametro)
    })
    this.listaInfo();

    this.form = this.fb.group({
      responsable_mejora: ["", Validators.required],
      fecha_inicio: ["", Validators.required],
      fecha_final: ["", Validators.required],
      estrategia: ["", Validators.required],
      recursos: ["", Validators.required],
      entregables: ["", Validators.required],
      ruta: [""],
      dofa: ["", Validators.required],
    });
  }


          
  listaInfo() {
    this.infoService.listar().subscribe(
      (data: any) => {
        this.info = data;
        console.log('data: ', this.info)
      })
  }

  listar() {
    this.authPlaneacion.listar().subscribe(
      (data: any) => {
        this.planeacion = data;
        console.log('data: ', this.info)
      })
  }


  get responsableInvalid() {
    return this.form.get('responsable_mejora')?.invalid && this.form.get('responsable_mejora')?.touched
  }
  get fechaInicioInvalid() {
    return this.form.get('fecha_inicio')?.invalid && this.form.get('fecha_inicio')?.touched
  }
  get fechaFinalInvalid() {
    return this.form.get('fecha_final')?.invalid && this.form.get('fecha_final')?.touched
  }
  get estrategiaInvalido() {
    return this.form.get('estrategia')?.invalid && this.form.get('estrategia')?.touched
  }
  get recursosInvalid() {
    return this.form.get('recursos')?.invalid && this.form.get('recursos')?.touched
  }
  get entregablesInvalid() {
    return this.form.get('entregables')?.invalid && this.form.get('entregables')?.touched
  }
  get dofaInvalid() {
    return this.form.get('dofa')?.invalid && this.form.get('dofa')?.touched
  }
  Arreglo() {

    let id = +this.idParametro
    let maeInfoGeneral = {
      id
    }

    let arreglo = {};
    let responsableMejora = this.form.get('responsable_mejora')?.value
    let fechaInicio = this.form.get('fecha_inicio')?.value 
    let fechaFin = this.form.get('fecha_final')?.value 
    let estrategiaImpl = this.form.get('estrategia')?.value 
    let recursosNecesarios = this.form.get('recursos')?.value 
    let entregables = this.form.get('entregables')?.value 
    let relacionSynology = this.form.get('ruta')?.value 
    let matrizDofa = this.form.get('dofa')?.value 

    arreglo = {
      maeInfoGeneral,
      responsableMejora,
      fechaInicio,
      fechaFin,
      estrategiaImpl,
      recursosNecesarios,
      entregables,
      relacionSynology,
      matrizDofa,
    }
    return arreglo;
  }

  evento(value: any) {
    // console.log(value.target.value)
    let valorDofa= value.target.value
    this.valor=valorDofa
    if(this.valor==='SI'){
      console.log('valor dofa: ',valorDofa)
      // this.router.navigate(["/dofa/", this.idParametro])
    }else{
      console.log('N valor dofa: ',valorDofa)
      // this.router.navigate(["/plan-mejora-organizacional"])
    }
    // localStorage.setItem('Plazo', this.plazo)
  }


  guardar(){
    let arreglo= this.Arreglo();
    console.log(arreglo)

    this.authPlaneacion.guardar(arreglo).subscribe(
      (data: any): void => {
        data = this.data;
        Swal.close();
        Swal.fire({
          icon: 'success',
          text: 'Datos guardados correctamente',
          title: 'Se guardaron los datos exitosamente',
        });
        this.listar();
        this.form.reset(); 
        if(this.valor==='SI'){
          this.router.navigate(["/dofa/", this.idParametro])
        }else{
          this.router.navigate(["/seguimiento-mejora/", this.idParametro])
        }
        // if(arreglo==='SI'){
        //   // this.router.navigate(["/planeacion-ejecucion", this.idParametro])
        //   console.log('SI TIENE DOFA')
        // }else{
        //   this.router.navigate(["/seguimiento-mejora"])
        // }
        console.log('Planeacion lista: ',this.listar)
      }, err => {
        Swal.fire("Error", err.error.message, "error");
      });
    }   
}
