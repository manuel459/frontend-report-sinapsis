import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponse } from '../interfaces/IResponse';
import { IRequestInsert } from '../interfaces/IRequestInsert';

@Injectable({
  providedIn: 'root'
})
export class CampaniaTsService {

  url: string = 'http://localhost:3000/campania'

  constructor(private _http : HttpClient) { }

  insertCampania(request:IRequestInsert): Observable<IResponse> {
    return this._http.post<IResponse>(this.url, request);
  }
}
