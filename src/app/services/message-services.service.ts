import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRequest } from '../interfaces/IRequest';
import { IResponse } from '../interfaces/IResponse';

@Injectable({
  providedIn: 'root'
})
export class MessageServicesService {

  url: string = 'http://localhost:3000/message'

  constructor(private _http : HttpClient) { }

  messageList(request:IRequest): Observable<IResponse> {
    return this._http.post<IResponse>(this.url, request);
  }
}
