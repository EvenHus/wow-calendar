import {Component, Input} from "@angular/core";
import {ApiService} from "../core/api.service";

@Component({
  moduleId: module.id,
  selector: 'app-progression',
  templateUrl: './progression.html'
})

export class ProgressionComponent {
  data: any[] = [];
  @Input() name: string;
  @Input() realm: string;

  constructor(private _api: ApiService) {
  }

  setData(): void {
    if (this.name && this.realm) {
      const url = 'https://eu.api.battle.net/wow/character/'
        + this.realm + '/' + this.name + '?fields=progression&locale=en_GB&apikey=p28jsb432q4vdd3zb9xtcdss6bpgatt3';
      this._getProgressionData(url);
    }
  }

  private _getProgressionData(url: string): void {
    this._api.getData(url).subscribe( data => {
      this.data = data.progression.raids;
    });
  }
}
