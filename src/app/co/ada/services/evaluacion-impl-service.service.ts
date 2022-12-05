import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EvaluacionImplServiceService {

  authURL = `${environment.URL_BASE}calidad/evaluacion/EvaluacionImpl`;

  constructor(
    private httpClient: HttpClient
  ) { }
  
  listar() {
    return this.httpClient.get(`${this.authURL}/listarEvaluacionImpl`)
  }
  
  guardar(info: any) {
    return this.httpClient.post(`${this.authURL}/guardarEvaluacionImpl`, info);
  }
  
  editar(id: number, info: any) {
    return this.httpClient.put(`${this.authURL}/actualizarEvaluacionImpl/${id}`, info);
  }
  
  }
  