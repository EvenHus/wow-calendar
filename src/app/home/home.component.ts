import {Component, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {Subscription} from 'rxjs/Subscription';
import {ApiService} from "../core/api.service";
import {Subject} from "rxjs/Subject";

@Component({
  moduleId: module.id,
  templateUrl: './home.html'
})

export class HomeComponent implements OnInit {
  name: string = 'Salasade';
  realm: string = 'aggramar';
  tab: string;


  realmList: string[] = ['Dragonblight', 'Aggramar', 'Outland', 'Stormscale'];

  constructor(private _api: ApiService) {

  }

  ngOnInit() {
    if (!this.tab) {
      this.tab = 'mounts';
    }
    console.log(this.realm);
  }

  setTab(tab: string): void {
    this.tab = tab;
  }
}
