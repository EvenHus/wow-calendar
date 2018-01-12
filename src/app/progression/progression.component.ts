import {Component, Input, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {ApiService} from '../core/api.service';
import * as rootState from '../store/index';
import * as DataActions from '../store/data/data.actions';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';

@Component({
  moduleId: module.id,
  selector: 'app-progression',
  templateUrl: './progression.html'
})

export class ProgressionComponent implements OnDestroy, OnChanges {
  @Input() name: string;
  @Input() realm: string;
  data: any[] = [];
  loading$: Observable<boolean>;
  progressionSubscription: Subscription;

  constructor(private _api: ApiService, private _store: Store<rootState.IAppState>) {
    this.loading$ = this._store.select(rootState.getDataLoadingState);
  }

  ngOnChanges(): void {
    if (this.name && this.realm) {
      this.progressionSubscription = this._store.select(rootState.getProgression).subscribe( data => {
        if (data) {
          this.data = data.progression.raids;
        }
      });
      this._store.dispatch(new DataActions.LoadProgression({name: this.name, realm: this.realm}));
    }
  }

  ngOnDestroy(): void {
    if (this.progressionSubscription) {
      this.progressionSubscription.unsubscribe();
    }
  }
}
