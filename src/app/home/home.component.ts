import {Component, OnChanges} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {HttpClient} from '@angular/common/http';

@Component({
  moduleId: module.id,
  templateUrl: './home.html'
})

export class HomeComponent implements OnChanges{
  data: any = [];
  name: string;
  realm: string;

  constructor(private _http: HttpClient) {
  }

  ngOnChanges() {
  }

  getWowData(url): void {
    this._getData(url).subscribe(data => {
      this.data = data;
      console.log(this.data.length);
    });
  }

  dataButton(): void {
    if (this.name && this.realm) {
      const url = 'https://eu.api.battle.net/wow/character/'
        + this.realm + '/' + this.name + '?fields=mounts&locale=en_GB&apikey=p28jsb432q4vdd3zb9xtcdss6bpgatt3';
      this.getWowData(url);
    }
  }

  private _getData(url: any): Observable<any> {
    return this._http.get(url);
  }

}
