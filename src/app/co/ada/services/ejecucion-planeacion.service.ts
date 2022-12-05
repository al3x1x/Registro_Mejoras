import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EjecucionPlaneacionService {

 
authURL = `${environment.URL_BASE}calidad/planeacionEjecucion/planeacionEjecucion`;

constructor(
  private httpClient: HttpClient
) { }

listar() {
  return this.httpClient.get(`${this.authURL}/listarPlaneacionEjecucion`)
}

guardar(info: any) {
  return this.httpClient.post(`${this.authURL}/guardarPlaneacionEjecucion`, info);
}

editar(id: number, info: any) {
  return this.httpClient.put(`${this.authURL}/actualizarEvaluarMejora/${id}`, info);
}

}
