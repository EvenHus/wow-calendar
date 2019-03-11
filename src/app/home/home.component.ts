import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import * as rootState from '../store';
import * as DataActions from '../store/data/data.actions';
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
  realmSubscription: Subscription;

  realmList: string[] = [];

  constructor(private _activatedRoute: ActivatedRoute, private _store: Store<rootState.IAppState>) {
  }

  ngOnInit() {
    this.loadingSubscription = this._store.select(rootState.getDataLoadingState)
      .subscribe(loading => this.loading = loading);
    this.loggedInUserSubscription = this._store.select(rootState.getLoggedInUser)
      .subscribe(loggedInUser => {
        if (loggedInUser) {
          this.name = loggedInUser.username;
          this.realm = loggedInUser.realm;
        }
      });
    if (!this.tab) {
      this.tab = 'mounts';
    }
    this.realmSubscription = this._store.select(rootState.getRealms).subscribe(data => {
      if (data) {
        data.realms.map(realm => {
          this.realmList.push(realm.name);
        });
      }
    });
    this._store.dispatch(new DataActions.LoadRealms());
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
    if (this.realmSubscription) {
      this.realmSubscription.unsubscribe();
    }
  }
}
