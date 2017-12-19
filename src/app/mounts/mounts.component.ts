import {Component, Input} from '@angular/core';
import {ApiService} from '../core/api.service';

@Component({
  moduleId: module.id,
  selector: 'app-mounts',
  templateUrl: './mounts.html'
})

export class MountsComponent {
  @Input() realm: string;
  @Input() name: string;

  data: any [] = [];

  constructor(private _api: ApiService) {
  }

  getWowData(url): void {
    this._api.getData(url).subscribe(data => {
      this.data = data.mounts.collected;
      console.log(this.data);
    });
  }

  dataButton(): void {
    if (this.name && this.realm) {
      const url = 'https://eu.api.battle.net/wow/character/'
        + this.realm + '/' + this.name + '?fields=mounts&locale=en_GB&apikey=p28jsb432q4vdd3zb9xtcdss6bpgatt3';
      this.getWowData(url);
    }
  }
}
