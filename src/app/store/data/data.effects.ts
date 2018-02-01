import {Injectable} from '@angular/core';
import {Effect, Actions} from '@ngrx/effects';
import * as DataActions from './data.actions';
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';
import {ApiService} from '../../core/api.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';

@Injectable()
export class DataEffects {

  @Effect() loadMountsEffect$: Observable<Action> = this._actions.ofType(DataActions.LOAD_MOUNTS)
    .map((action: DataActions.LoadMounts) => action.payload)
    .switchMap(payload => {
      return this._api.getMounts(payload.name, payload.realm)
        .map(result => new DataActions.LoadMountsSuccess(result))
        .catch(response => Observable.of(new DataActions.LoadMountsFailure(response)));
    });

  @Effect() loadProgressionEffect$: Observable<Action> = this._actions.ofType(DataActions.LOAD_PROGRESSION)
    .map((action: DataActions.LoadProgression) => action.payload)
    .switchMap(payload => {
      return this._api.getProgression(payload.name, payload.realm)
        .map(result => new DataActions.LoadProgressionSuccess(result))
        .catch(error => Observable.of(new DataActions.LoadProgressionFailed(error)));
    });

  @Effect() loadTitlesEffect$: Observable<Action> = this._actions.ofType(DataActions.LOAD_TITLES)
    .map((action: DataActions.LoadTitles) => action.payload)
    .switchMap(payload => {
      return this._api.getTitles(payload.name, payload.realm)
        .map(result => new DataActions.LoadTitlesSuccess(result))
        .catch(error => Observable.of(new DataActions.LoadTitlesFailed(error)));
    });

  constructor(private _actions: Actions, private _api: ApiService) {}
}
