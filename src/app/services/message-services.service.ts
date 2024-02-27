import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRequest } from '../interfaces/IRequest';

@Injectable({
  providedIn: 'root'
})
export class MessageServicesService {

  url: string = 'http://localhost:3000/message'

  constructor(private _http : HttpClient) { }

  messageList(request:IRequest): Observable<Response> {
    request.id = 1;
    request.mes = 2;
    return this._http.post<Response>(this.url, request);
  }
}
