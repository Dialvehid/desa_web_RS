import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Usuario } from '../login/usuario';
import { HOST_BACKEND } from '../config/config';
import { LOGIN_SUCCESSFULL_JSON } from '../dummyData/loginSuccessfull.json';

@Injectable({
    providedIn: 'root'
  })
export class PerfilService {

    constructor(private httpClient: HttpClient) {}

    ObtenerDatosUsuario(id: number): Observable<any>
    {
      return this.httpClient.get(`${HOST_BACKEND}/usuario/id/${id}`);
    }

    EditarDatosUsuario(usuario: Usuario): Observable<any>
    {
      console.log(JSON.stringify(usuario));
      
      return this.httpClient.put(`${HOST_BACKEND}/usuario`, usuario);
    }
}