import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SeguimientoService {

  authURL = `${environment.URL_BASE}calidad/seguimientos/seguimientos`;

  constructor(
    private httpClient: HttpClient
  ) { }

  listar() {
    return this.httpClient.get(`${this.authURL}/listarSeguimiento`)
  }

  guardar(info: any) {
    return this.httpClient.post(`${this.authURL}/guardarSeguimiento`, info);
  }

  editar(id: number, info: any) {
    return this.httpClient.put(`${this.authURL}/actualizarSeguimiento/${id}`, info);
  }
}
