import {Component, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {ApiService} from '../core/api.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  moduleId: module.id,
  templateUrl: './home.html'
})

export class HomeComponent implements OnInit {
  name: string;
  realm: string;
  tab: string;


  realmList: string[] = ['Dragonblight', 'Aggramar', 'Outland', 'Stormscale'];

  constructor(private _activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    const params = this._activatedRoute.snapshot.params;
    this.name = params.user;
    this.realm = params.realm;
    if (!this.tab) {
      this.tab = 'mounts';
    }
    this.realm = this.realmList[1];
  }

  setTab(tab: string): void {
    this.tab = tab;
  }
}
