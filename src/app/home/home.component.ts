import {Component, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {ApiService} from '../core/api.service';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import * as rootState from '../store';

@Component({
  moduleId: module.id,
  templateUrl: './home.html'
})

export class HomeComponent implements OnInit {
  name: string;
  realm: string;
  tab: string;
  loading$: Observable<any>;

  realmList: string[] = ['Dragonblight', 'Aggramar', 'Outland', 'Stormscale'];

  constructor(private _activatedRoute: ActivatedRoute, private _store: Store<rootState.IAppState>) {
  }

  ngOnInit() {
    this.loading$ = this._store.select(rootState.getDataLoadingState);
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
