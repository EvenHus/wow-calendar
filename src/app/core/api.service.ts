import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Rx";
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ApiService {

  constructor(private _http: HttpClient) {}

  getData(url: any): Observable<any> {
    return this._http.get(url);
  }
}
