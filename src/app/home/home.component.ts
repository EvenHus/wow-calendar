import {Component, OnChanges} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {HttpClient} from '@angular/common/http';

@Component({
  moduleId: module.id,
  templateUrl: './home.html'
})

export class HomeComponent implements OnChanges{

  private apiUrl = 'https://us.api.battle.net/wow/achievement/2144?locale=en_US&apikey=p28jsb432q4vdd3zb9xtcdss6bpgatt3';
  data: any = [];
  loading: boolean;
  constructor(private _http: HttpClient) {
  }

  ngOnChanges() {
    if (this.data.length > 0) {
      this.loading = false;
    } else {
      this.loading = true;
    }
  }

  getData(): Observable<any> {
    return this._http.get(this.apiUrl);
  }

  getWowData(): void {
    this.getData().subscribe(data => {
      this.data = data;
    });
  }

  dataButton(): void {
    //this.loading = true;
    //this.getWowData();
    //this.getData();
    console.log('button');
  }


}
