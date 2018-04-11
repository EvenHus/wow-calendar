import {Component, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {ApiService} from '../core/api.service';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import * as rootState from '../store';
import {Subscription} from 'rxjs/Subscription';

@Component({
  moduleId: module.id,
  templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit, OnDestroy {
  name: string;
  realm: string;
  tab: string;
  loading: boolean;

  loggedInUserSubscription: Subscription;
  loadingSubscription: Subscription;

  realmList: string[] = ['Dragonblight', 'Aggramar', 'Outland', 'Stormscale'];

  constructor(private _activatedRoute: ActivatedRoute, private _store: Store<rootState.IAppState>) {
  }

  ngOnInit() {
    this.loadingSubscription = this._store.select(rootState.getDataLoadingState).subscribe(loading => this.loading = loading);
    this.loggedInUserSubscription = this._store.select(rootState.getLoggedInUser).subscribe(loggedInUser => {
      if (loggedInUser) {
        this.name = loggedInUser.username;
        this.realm = loggedInUser.realm;
      }
    });
    if (!this.tab) {
      this.tab = 'mounts';
    }
    this.realm = this.realmList[1];
  }

  setTab(tab: string): void {
    this.tab = tab;
  }

  ngOnDestroy(): void {
    if (this.loggedInUserSubscription) {
      this.loggedInUserSubscription.unsubscribe();
    }

    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }
  }
}
