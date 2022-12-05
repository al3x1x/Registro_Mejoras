import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { InfoGeneralService } from '../../services/info-general.service';


@Component({
  selector: 'app-info-general',
  templateUrl: './info-general.component.html',
  styleUrls: ['./info-general.component.css']
})
export class InfoGeneralComponent implements OnInit {
  form!: FormGroup;
  info!: {};
  detalleInfo!: any;
  data: any[] = [];
  idRuta: any;

  today: Date = new Date();
  pipe = new DatePipe('en');
  todayWithPipe: any;

  constructor(
  private fb:FormBuilder,
  private auth: InfoGeneralService,
  private router: Router
  ) { }

  ngOnInit(): void {
    this.todayWithPipe = this.pipe.transform(Date.now(), 'dd/MM/yyyy');
    this.form = this.fb.group({
      fecha_registro: ["", Validators.required],
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

  

  get fechaValid(){
    return this.form.get('fecha_registro')?.invalid && this.form.get('fecha_registro')?.touched 
  }
  get origenInvalido(){
    return this.form.get('origen_propuesta')?.invalid && this.form.get('origen_propuesta')?.touched 
  }
  get propuestaInvalida(){
    return this.form.get('propuesta_por')?.invalid && this.form.get('propuesta_por')?.touched
  }
  get procesoInvalido(){
    return this.form.get('proceso_asociado')?.invalid && this.form.get('proceso_asociado')?.touched
  }
  get tituloInvalido(){
    return this.form.get('titulo_mejora')?.invalid && this.form.get('titulo_mejora')?.touched
  }
  get herramientaInvalida(){
    return this.form.get('herramienta_proceso')?.invalid && this.form.get('herramienta_proceso')?.touched
  }
  get descripcionInvalida(){
    return this.form.get('descripcion')?.invalid && this.form.get('descripcion')?.touched
  }
  get mejoraInvalida(){
    return this.form.get('mejora_a_lograr')?.invalid && this.form.get('mejora_a_lograr')?.touched
  }
  get accionInvalida(){
    return this.form.get('acciones_propuestas')?.invalid && this.form.get('acciones_propuestas')?.touched
  }

  // fecha(){
  //     let fechaRegistro = this.form.get("fechaRegistro")?.value
  // }

  guardar() {
    if(this.form.invalid){
      Swal.fire("Error", "Debe de llenar los campos para ingresar", "error");
      return;
    }
    Swal.fire({
      icon: 'info',
      text: 'Espere un momento',
      title: 'Enviando datos....',
    });
    Swal.showLoading();

    const json = {
      fechaRegistro: this.form.get("fecha_registro")?.value,
      origenPropuesta: this.form.get("origen_propuesta")?.value, 
      propuestaPor: this.form.get("propuesta_por")?.value,
      procesoAsociado: this.form.get("proceso_asociado")?.value,
      tituloMejora: this.form.get("titulo_mejora")?.value,
      herramientaProceso: this.form.get("herramienta_proceso")?.value,
      descripcion: this.form.get("descripcion")?.value,
      mejoraLograr: this.form.get("mejora_a_lograr")?.value,
      accionesPropuestas: this.form.get("acciones_propuestas")?.value,
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
        this.listaInfo();
        this.form.reset(); 
      }, err => {
        Swal.fire("Error", err.error.message, "error");
      }
    );
  }



  listaInfo() {

    this.auth.listar().subscribe(
      (data: any) => {
        this.data = data;
        let prueba: any[]= [];
        console.log("respuesta servicio", data);

        for (let i= 0; i<data.length; i++){
          prueba.push(data[i].id)
        }
        this.idRuta=Math.max(...prueba)
        
        this.router.navigate(["evaluacion-mejora/", this.idRuta])

        console.log('Prueba Arreglo', this.idRuta)

          // console.log('element', element)
          // console.log('prueba: ', data[data.length-1].id)
          // console.log('id Ruta: ', this.idRuta)

      }
    );
  }

  
}
