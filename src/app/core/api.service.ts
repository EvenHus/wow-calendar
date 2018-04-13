import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ApiService {

  private _key: string = 'p28jsb432q4vdd3zb9xtcdss6bpgatt3';

  constructor(private _http: HttpClient) {}

  getMounts(name: string, realm: string): Observable<any> {
    const url = 'https://eu.api.battle.net/wow/character/'
      + realm + '/' + name + '?fields=mounts&locale=en_GB&apikey=' + this._key;
    return this._http.get(url);
  }

  getProgression(name: string, realm: string): Observable<any> {
    const url = 'https://eu.api.battle.net/wow/character/'
      + realm + '/' + name + '?fields=progression&locale=en_GB&apikey=' + this._key;
    return this._http.get(url);
  }

  getTitles(name: string, realm: string): Observable<any> {
    const url = 'https://eu.api.battle.net/wow/character/' +
      realm + '/' + name + '?fields=titles&locale=en_GB&apikey=' + this._key;
    return  this._http.get(url);
  }

  getRealms(): Observable<any> {
    const url = 'https://eu.api.battle.net/wow/realm/status?locale=en_GB&apikey=' + this._key;
    return this._http.get(url);
  }

  getProfile(name: string, realm: string): Observable<any> {
    const url = 'https://eu.api.battle.net/wow/character/' + realm + '/' + name + '?locale=en_GB&apikey=' + this._key;
    return this._http.get(url);
  }

}
