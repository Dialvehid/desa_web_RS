import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HOST_BACKEND } from '../config/config';
import { Usuario } from '../login/usuario';

@Injectable({
  providedIn: 'root'
})
export class BuscadorService {

  constructor(private httpClient: HttpClient) { }

  buscarUsuarios(busqueda: string) : Observable<Usuario[]>{
    return this.httpClient.get<Usuario[]>(`${HOST_BACKEND}/buscar?s=${busqueda}`);
  }

}
