import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EvaluarMejoraService {

authURL = `${environment.URL_BASE}calidad/evaluarMejora/evaluarMejora`;

constructor(
  private httpClient: HttpClient
) { }

listar() {
  return this.httpClient.get(`${this.authURL}/listarEvaluarMejora`)
}

guardar(info: any) {
  return this.httpClient.post(`${this.authURL}/guardarEvaluarMejora`, info);
}

editar(id: number, info: any) {
  return this.httpClient.put(`${this.authURL}/actualizarEvaluarMejora/${id}`, info);
}



}
