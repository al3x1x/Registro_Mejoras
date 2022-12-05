import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { EvaluarMejoraService } from '../../services/evaluar-mejora.service';
import { InfoGeneralService } from '../../services/info-general.service';

@Component({
  selector: 'app-evaluacion-mejora',
  templateUrl: './evaluacion-mejora.component.html',
  styleUrls: ['./evaluacion-mejora.component.css']
})
export class EvaluacionMejoraComponent implements OnInit {

  form!: FormGroup;
  data: any[] = [];
  idParametro: any;
  idRuta: any;
  plazo!: any;
  valor!: any;
  ngPlazo: any;



  constructor(
    private fb: FormBuilder,
    private auth: EvaluarMejoraService,
    private ruta: ActivatedRoute,
    private infoService: InfoGeneralService,
    private router: Router

  ) { }

  ngOnInit(
  ): void {
    this.ruta.params.subscribe((res: any) => {
      this.idParametro = res?.id
      console.log('respuesta:  ', this.idParametro)
    })

    // this.listaInfo()
    this.lista()
    this.form = this.fb.group({
      cargo_responsable: ["", Validators.required],
      evaluacion_mejora: ["", Validators.required],
      decision: ["", Validators.required],
      impacto: ["", Validators.required],
      estado: ["", Validators.required],
      // plazo: ["", Validators.required],
      indicador: ["", Validators.required]
    })

    
  }

  get cargoInvalido() {
    return this.form.get('cargo_responsable')?.invalid && this.form.get('cargo_responsable')?.touched
  }
  get evaluacionInvalida() {
    return this.form.get('evaluacion_mejora')?.invalid && this.form.get('evaluacion_mejora')?.touched
  }
  get decisionInvalida() {
    return this.form.get('decision')?.invalid && this.form.get('decision')?.touched
  }
  get impactoInvalido() {
    return this.form.get('impacto')?.invalid && this.form.get('impacto')?.touched
  }
  get estadoInvalido() {
    return this.form.get('estado')?.invalid && this.form.get('estado')?.touched
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

  decision(valor: any){
    let decision = valor.target.value

    if(decision==='aprobado'){
      this.valor= decision
    }else{
      this.valor= decision
    }
  }

  redirect(){
    this.router.navigate(["/plan-mejora-organizacional"])
  }

  guardar() {
    if (this.form.invalid) {
      Swal.fire("Error", "Debe de llenar los campos para ingresar", "error");
      return;
    }
    Swal.fire({
      icon: 'info',
      text: 'Espere un momento',
      title: 'Enviando datos....',
    });
    Swal.showLoading();

    let id = +this.idParametro
    let maeInfoGeneral = {
      id
    }

    let plazo=this.ngPlazo;

    const json = {
      maeInfoGeneral,
      cargoResponsable: this.form.get("cargo_responsable")?.value,
      evaluacionMejora: this.form.get("evaluacion_mejora")?.value,
      decision: this.form.get("decision")?.value,
      impacto: this.form.get("impacto")?.value,
      estado: this.form.get("estado")?.value,
      plazo,
      indicador: this.form.get("indicador")?.value,
    }
    console.log('Json: ', json)

    this.auth.guardar(json).subscribe(
      (data: any): void => {
        data = this.data;

        Swal.close();

        Swal.fire({
          icon: 'success',
          text: 'Datos guardados correctamente',
          title: 'Se guardaron los datos exitosamente',
        });
        this.lista();
        console.log('data: ', data)
        this.form.reset();
        if(this.valor==='aprobado'){
          this.router.navigate(["/planeacion-ejecucion", this.idParametro])
        }else{
          this.router.navigate(["/plan-mejora-organizacional"])
        }
      }, err => {
        Swal.fire("Error", err.error.message, "error");
      }
    );
  }

  lista() {
    this.auth.listar().subscribe(
      (data: any) => {
        this.data = data;
      }
    );
  }

  // listaInfo() {

  //   this.infoService.listar().subscribe(
  //     (data: any) => {

  //       let prueba: any[]= [];
  //       console.log("respuesta servicio", data);

  //       for (let i= 0; i<data.length; i++){
  //         prueba.push(data[i].id)
  //       }
  //       this.idRuta=Math.max(...prueba)
        
  //       this.router.navigate(["planeacion-ejecucion/", this.idRuta])

  //       console.log('Prueba idRuta', this.idRuta)

  //     }
  //   );
  // }

}
