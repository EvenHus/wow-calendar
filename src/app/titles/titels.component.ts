import {Component, Input} from '@angular/core';
import {ApiService} from '../core/api.service';

@Component({
  moduleId: module.id,
  selector: 'app-titles',
  templateUrl: './titles.html'
})

export class TitelsComponent {
  @Input() name: string;
  @Input() realm: string;

  data: any[] = [];

  constructor(private _api: ApiService, ) {}

  setData(): void {
    if (this.name && this.realm) {
      const url = 'https://eu.api.battle.net/wow/character/' +
        this.realm + '/' + this.name + '?fields=titles&locale=en_GB&apikey=' + this._api.getKey() + '';
      this._getProgressionData(url);
    }
  }

  private _getProgressionData(url: string): void {
    this._api.getData(url).subscribe( data => {
      this.data = data;
      console.log(this.data);
    });
  }
}
