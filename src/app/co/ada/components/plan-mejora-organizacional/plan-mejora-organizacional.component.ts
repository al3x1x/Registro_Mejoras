import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { EvaluarMejoraService } from '../../services/evaluar-mejora.service';
import { InfoGeneralService } from '../../services/info-general.service';

@Component({
  selector: 'app-plan-mejora-organizacional',
  templateUrl: './plan-mejora-organizacional.component.html',
  styleUrls: ['./plan-mejora-organizacional.component.css']
})
export class PlanMejoraOrganizacionalComponent implements OnInit {

  form!: FormGroup;
  formEvaluar!: FormGroup;
  info: any;
  evaluacion: any;
  idParametro: any;
  data: any[] = [];
  data2: any[] = [];
  plazo!: any;
  valor!: any;
  origenPropuesta!: any;
  closeModal: boolean = false;
  displayStyle = "none";
  ngPlazo: any;
  a: any;
  b: any;

  constructor(
    private infoService: InfoGeneralService,
    private router: Router,
    private fb: FormBuilder,
    private authEvaluacion: EvaluarMejoraService,

  ) { }

  closePopup() {
    this.displayStyle = "none";
  }


  listaInfo() {
    this.infoService.listar().subscribe(
      (data: any) => {
        let ordenData = data.sort((a: any , b: any) => {
          return a.id - b.id;
        });
        this.info = ordenData;
        // console.log('data-info general: ', this.info)
      })
  }

  listaEvaluar() {
    this.authEvaluacion.listar().subscribe(
      (data2: any) => {
        this.evaluacion = data2;
      }
    );
  }

  ngOnInit(): void {
    this.listaEvaluar()
    this.listaInfo();
    this.formEditar();
    this.formEditar2();

  }

  formEditar() {
    this.closeModal = true
    this.form = this.fb.group({
      origen_propuesta: ["", Validators.required],
      propuesta_por: ["", Validators.required],
      proceso_asociado: ["", Validators.required],
      titulo_mejora: ["", Validators.required],
      herramienta_proceso: ["", Validators.required],
      descripcion: ["", Validators.required],
      mejora_a_lograr: ["", Validators.required],
      acciones_propuestas: ["", Validators.required]
    });
  }

  formEditar2() {
    this.closeModal = true
    this.formEvaluar = this.fb.group({
      cargo_responsable: ["", Validators.required],
      evaluacion_mejora: ["", Validators.required],
      decision: ["", Validators.required],
      impacto: ["", Validators.required],
      estado: ["", Validators.required],
      plazo: ["", Validators.required],
      indicador: ["", Validators.required]
    })
  }






  get origenInvalido() {
    return this.form.get('origen_propuesta')?.invalid && this.form.get('origen_propuesta')?.touched
  }
  get propuestaInvalida() {
    return this.form.get('propuesta_por')?.invalid && this.form.get('propuesta_por')?.touched
  }
  get procesoInvalido() {
    return this.form.get('proceso_asociado')?.invalid && this.form.get('proceso_asociado')?.touched
  }
  get tituloInvalido() {
    return this.form.get('titulo_mejora')?.invalid && this.form.get('titulo_mejora')?.touched
  }
  get herramientaInvalida() {
    return this.form.get('herramienta_proceso')?.invalid && this.form.get('herramienta_proceso')?.touched
  }
  get descripcionInvalida() {
    return this.form.get('descripcion')?.invalid && this.form.get('descripcion')?.touched
  }
  get mejoraInvalida() {
    return this.form.get('mejora_a_lograr')?.invalid && this.form.get('mejora_a_lograr')?.touched
  }
  get accionInvalida() {
    return this.form.get('acciones_propuestas')?.invalid && this.form.get('acciones_propuestas')?.touched
  }

  // FORMULARIO EVALUACION DE MEJORA

  get cargoInvalido() {
    return this.formEvaluar.get('cargo_responsable')?.invalid && this.formEvaluar.get('cargo_responsable')?.touched
  }
  get evaluacionInvalida() {
    return this.formEvaluar.get('evaluacion_mejora')?.invalid && this.formEvaluar.get('evaluacion_mejora')?.touched
  }
  get decisionInvalida() {
    return this.formEvaluar.get('decision')?.invalid && this.formEvaluar.get('decision')?.touched
  }
  get impactoInvalido() {
    return this.formEvaluar.get('impacto')?.invalid && this.formEvaluar.get('impacto')?.touched
  }
  get estadoInvalido() {
    return this.formEvaluar.get('estado')?.invalid && this.formEvaluar.get('estado')?.touched
  }
  get plazoInvalido() {
    return this.form.get('plazo')?.invalid && this.form.get('plazo')?.touched
  }
  get indicadorInvalido() {
    return this.form.get('indicador')?.invalid && this.form.get('indicador')?.touched
  }


  evento(value: any) {
    // console.log(value.target.value)
    let impacto= value.target.value

    if(impacto==='alto'){
      this.ngPlazo='trimestral'
    }else if(impacto==='medio'){
      this.ngPlazo='semestral'
    }else{
      this.ngPlazo='anual'
    }
    // localStorage.setItem('Plazo', this.plazo)
  }

  redirect() {
    this.router.navigate(["info-general"])
  }


  editar1(id: number) {
    let datos
    this.idParametro = id;
    for (let i = 0; this.info.length; i++) {
      if (this.info[i].id === id) {
        datos = this.form.patchValue({
          origen_propuesta: this.info[i].origenPropuesta,
          propuesta_por: this.info[i].propuestaPor,
          titulo_mejora: this.info[i].tituloMejora,
          proceso_asociado: this.info[i].procesoAsociado,
          herramienta_proceso: this.info[i].herramientaProceso,
          descripcion: this.info[i].descripcion,
          mejora_a_lograr: this.info[i].mejoraLograr,
          acciones_propuestas: this.info[i].accionesPropuestas
        });
      }
    }
  }

  editar2(id: number) {
    let datos2
    this.idParametro = id;
    for (let i = 0; this.evaluacion.length; i++) {
      if (this.evaluacion[i].id === id) {
        datos2 = this.formEvaluar.patchValue({
          cargo_responsable: this.evaluacion[i].cargoResponsable,
          evaluacion_mejora: this.evaluacion[i].evaluacionMejora,
          decision: this.evaluacion[i].decision,
          impacto: this.evaluacion[i].impacto,
          estado: this.evaluacion[i].estado,
          plazo: this.evaluacion[i].plazo,
          indicador: this.evaluacion[i].indicador
        });
      }
    }
  }

  

  detalleEditar(id: number, data: any) {
    // console.log("data", data)
    if (data.id === id) {
      this.info = data;
    }
  }

  detalleEditar2(id: number, data2: any) {
    // console.log("data evaluar: ", data2)
    if (data2.id === id) {
      this.evaluacion = data2;
    }
  }


  organizarArreglo() {
    let arreglo = {};
    let origenPropuesta = this.form.get('origen_propuesta')?.value || this.info.origenPropuesta;
    let propuestaPor = this.form.get('propuesta_por')?.value || this.info.propuestaPor;
    let tituloMejora = this.form.get('titulo_mejora')?.value || this.info.tituloMejora;
    let procesoAsociado = this.form.get('proceso_asociado')?.value || this.info.procesoAsociado;
    let herramientaProceso = this.form.get('herramienta_proceso')?.value || this.info.herramientaProceso;
    let descripcion = this.form.get('descripcion')?.value || this.info.descripcion;
    let mejoraLograr = this.form.get('mejora_a_lograr')?.value || this.info.mejoraLograr;
    let accionesPropuestas = this.form.get('acciones_propuestas')?.value || this.info.accionesPropuestas;

    arreglo = {
      origenPropuesta,
      propuestaPor,
      tituloMejora,
      procesoAsociado,
      herramientaProceso,
      descripcion,
      mejoraLograr,
      accionesPropuestas
    }
    return arreglo;
  }

  Arreglo() {
    let id = +this.idParametro
    let maeInfoGeneral = {
      id
    }

    let arreglo = {};
    let cargoResponsable = this.formEvaluar.get('cargo_responsable')?.value || this.info.cargoResponsable
    let evaluacionMejora = this.formEvaluar.get('evaluacion_mejora')?.value || this.info.evaluacionMejora
    let decision = this.formEvaluar.get('decision')?.value || this.info.decision
    let impacto = this.formEvaluar.get('impacto')?.value || this.info.impacto
    let estado = this.formEvaluar.get('estado')?.value || this.info.estado
    let plazo = this.formEvaluar.get('plazo')?.value || this.info.plazo
    let indicador = this.formEvaluar.get('indicador')?.value || this.info.indicador

    arreglo = {
      maeInfoGeneral,
      cargoResponsable,
      evaluacionMejora,
      decision,
      impacto,
      estado,
      plazo,
      indicador,
    }
    return arreglo;
  }

  editarInfo(id: number) {
    let arreglo = this.organizarArreglo();
    this.infoService.editar(id, arreglo).subscribe(
      (data: any) => {
        Swal.fire({
          icon: 'success',
          text: 'Información editada correctamente',
          title: 'Se actualizaron los datos correctamente',
          confirmButtonText: 'Ok',
          denyButtonText: `Don't save`,
        }).then((result) => {
          // window.location.reload();
          this.listaInfo();
        });
        // console.log("Arreglo de info-general: ", arreglo)
      }, err => {
        Swal.fire("Error", err.message, "error");
      }
    )
  }

  editarEvaluacion(id: number) {
    let arreglo = this.Arreglo();
    console.log('Arreglo: ', arreglo)
    this.authEvaluacion.editar(id, arreglo).subscribe(
      (data2: any) => {
        Swal.fire({
          icon: 'success',
          text: 'Información editada correctamente',
          title: 'Se actualizaron los datos correctamente',
          confirmButtonText: 'Ok',
          denyButtonText: `Don't save`,
        }).then((result) => {
          // window.location.reload();
          this.listaEvaluar();
          
        });
        // console.log("Arreglo: ", arreglo)
      }, err => {
        Swal.fire("Error", err.message, "error");
      }
    )

  }


  prueba() {
    console.log(this.form.value);
  }
}
