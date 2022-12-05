import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})


export class InfoGeneralService {

  authURL = `${environment.URL_BASE}calidad/infoGeneral/infoGeneral`;

  constructor(
    private httpClient: HttpClient
  ) { }

  listar() {
    return this.httpClient.get(`${this.authURL}/listarInfoGeneral`)
  }

  guardar(info: any) {
    return this.httpClient.post(`${this.authURL}/guardarInfoGeneral`, info);
  }

  editar(id: number, info: any) {
    return this.httpClient.put(`${this.authURL}/actualizarInfoGeneral/${id}`, info);
  }

}
