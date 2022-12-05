import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DofaService } from '../../services/dofa.service';
import { EjecucionPlaneacionService } from '../../services/ejecucion-planeacion.service';
import { InfoGeneralService } from '../../services/info-general.service';

@Component({
  selector: 'app-dofa',
  templateUrl: './dofa.component.html',
  styleUrls: ['./dofa.component.css']
})
export class DofaComponent implements OnInit {
  dofa: any;
  info: any;
  plan: any;
  form!: FormGroup;
  idParametro!: number;
  id!: number;
  debilidades: any;
  oportunidades: any;
  amenazas: any;
  fortalezas: any;
  // index: number=1;

  constructor(
    private infoService: InfoGeneralService,
    private authPlaneacion: EjecucionPlaneacionService,
    private auth: DofaService,
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
    this.listarDofa();
    this.listarPlaneacion();
    this.formEditar()
    // this.indice()

    

  }

  formEditar() {
    this.form = this.fb.group({
      debilidades: [""],
      calDebilidades: [""],
      oportunidades: [""],
      calOportunidades: [""],
      fortalezas: [""],
      calFortalezas: [""],
      amenazas: [""],
      calAmenazas: [""]
    });
  }

  listaInfo() {
    this.infoService.listar().subscribe(
      (data: any) => {
        this.info = data;
        console.log('data: ', this.info)
      })
  }

  listarPlaneacion() {
    this.authPlaneacion.listar().subscribe(
      (data: any) => {
        this.plan = data;
        console.log('data: ', this.plan)
      })
  }


  listarDofa() {
    this.auth.listar().subscribe(
      (data: any) => {
        let dataFiltro1=data.filter((res:any) =>res.debilidades !== null)
        let dataFiltro2=data.filter((res:any) =>res.oportunidades !== null)
        let dataFiltro3=data.filter((res:any) =>res.fortalezas !== null)
        let dataFiltro4=data.filter((res:any) =>res.amenazas !== null)
        console.log('Data filtro: 1', dataFiltro1)
        console.log('Data filtro: 2', dataFiltro2)
        console.log('Data filtro: 3', dataFiltro3)
        console.log('Data filtro: 4', dataFiltro4)

        this.debilidades=dataFiltro1
        this.oportunidades=dataFiltro2
        this.fortalezas=dataFiltro3
        this.amenazas=dataFiltro4

        this.dofa = data;
        console.log('data dofa: ', this.dofa)
      })
  }

  limpiarCampos(){
    this.form.patchValue({
      debilidades: '',         
      calDebilidades: '',
      oportunidades: '',
      calOportunidades: '',
      fortalezas: '',
      calFortalezas: '',
      amenazas: '',
      calAmenazas: ''     
    });


  }


  Arreglo() {
    let id = +this.idParametro
    let nulo = null
    let maeInfoGeneral = {
      id
    }
    let maePlaneacionejecucion = {
      id
    }
    let camposNull = nulo

    let arreglo = {};
    let numDebilidades = camposNull
    let debilidades = this.form.get('debilidades')?.value || this.dofa.debilidades
    let calDebilidades = this.form.get('calDebilidades')?.value || this.dofa.calDebilidades
    let numFortalezas = camposNull
    let fortalezas = this.form.get('fortalezas')?.value || this.dofa.fortalezas
    let calFortalezas = this.form.get('calFortalezas')?.value || this.dofa.calFortalezas
    let numOportunidades = camposNull
    let oportunidades = this.form.get('oportunidades')?.value || this.dofa.oportunidades
    let calOportunidades = this.form.get('calOportunidades')?.value || this.dofa.calOportunidades
    let numAmenazas = camposNull
    let amenazas = this.form.get('amenazas')?.value || this.dofa.amenazas
    let calAmenazas = this.form.get('calAmenazas')?.value || this.dofa.calAmenazas


    arreglo = {
      maeInfoGeneral,
      maePlaneacionejecucion,
      numDebilidades,
      debilidades,
      calDebilidades,
      numFortalezas,
      fortalezas,
      calFortalezas,
      numOportunidades,
      oportunidades,
      calOportunidades,
      numAmenazas,
      amenazas,
      calAmenazas
    }
    return arreglo;
  }


  guardar() {
    let arreglo = this.Arreglo();
    console.log(arreglo)
    
    this.auth.guardar(arreglo).subscribe(
      (data: any): void => {
        Swal.close();

        Swal.fire({
          icon: 'success',
          text: 'Datos guardados correctamente',
          title: 'Se guardaron los datos exitosamente',
        });
        this.listarDofa();
        this.form.reset();
        // window.location.reload();
      }, err => {
        Swal.fire("Error", err.error.message, "error");
      });
  }



  editar1(id: number) {
    this.id= id
    let datos
    console.log('ID PRUEBA: ',id)
    for (let i = 0; this.dofa.length; i++) {
      if (this.dofa[i].id === id) {
        datos = this.form.patchValue({
          debilidades: this.dofa[i].debilidades,
          calDebilidades: this.dofa[i].calDebilidades
        });
        datos = this.form.patchValue({
          oportunidades: this.dofa[i].oportunidades,
          calOportunidades: this.dofa[i].calOportunidades
        });
        datos = this.form.patchValue({
          fortalezas: this.dofa[i].fortalezas,
          calFortalezas: this.dofa[i].calFortalezas
        });
        datos = this.form.patchValue({
          amenazas: this.dofa[i].amenazas,
          calAmenazas: this.dofa[i].calAmenazas
        });
        // console.log("Datos: ", datos)
      }
    }
  }

  editar(id: number) {
    let arreglo = this.Arreglo();
    console.log('arreglo: ', arreglo)
    console.log('id: ',id)

    this.auth.editar(id, arreglo).subscribe(
      (data: any) => {
        Swal.fire({
          icon: 'success',
          text: 'Información editada correctamente',
          title: 'Se actualizaron los datos correctamente',
          confirmButtonText: 'Ok',
          denyButtonText: `Don't save`,
        }).then((result) => {
          // window.location.reload();
          this.listarDofa();
        });
        console.log("Arreglo Editar: ", arreglo)
      }, err => {
        Swal.fire("Error", err.message, "error");
      }
    )
  }

  redirect() {
    this.router.navigate(['seguimiento-mejora/', this.idParametro])
  }

  eliminar(id: number) {
    this.auth.eliminar(id).subscribe(
      (data: any) => {

        Swal.fire({
          title: '¿Estas seguro?',
          text: "¿Seguro que quieres borrar el registro?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, eliminar!'
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire(
              '!Borrado!',
              'Registro eliminado exitosamente',
              'success'
            )
            this.dofa = data;
            this.listarDofa();
          }
        })
      })
  }



}
