import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponse } from '../interfaces/IResponse';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  url: string = 'http://localhost:3000/usuarios'

  constructor(private _http : HttpClient) { }

  getUsuarios(): Observable<IResponse> {
    return this._http.get<IResponse>(this.url);
  }
}
