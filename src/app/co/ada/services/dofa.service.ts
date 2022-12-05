import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class DofaService {


  authURL = `${environment.URL_BASE}calidad/dofa/dofa`;

  constructor(
    private httpClient: HttpClient
  ) { }
  
  listar() {
    return this.httpClient.get(`${this.authURL}/listarDofa`)
  }
  
  guardar(info: any) {
    return this.httpClient.post(`${this.authURL}/guardarDofa`, info);
  }
  
  editar(id: number, info: any) {
    return this.httpClient.put(`${this.authURL}/actualizarDofa/${id}`, info);
  }
  
  eliminar(id: number) {
    return this.httpClient.delete(`${this.authURL}/eliminarDofa/${id}`);
  }

  }
  