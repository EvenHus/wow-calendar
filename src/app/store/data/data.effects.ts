import {Injectable} from '@angular/core';
import {Effect, Actions} from '@ngrx/effects';
import * as DataActions from './data.actions';
import {Observable} from 'rxjs';
import {Action} from '@ngrx/store';
import {ApiService} from '../../core/api.service';




@Injectable()
export class DataEffects {
/*
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

  @Effect() loadRealms$: Observable<Action> = this._actions.ofType(DataActions.LOAD_REALMS)
    .switchMap(_ => {
      return this._api.getRealms()
        .map(result => new DataActions.LoadRealmsSuccess(result))
        .catch(error => Observable.of(new DataActions.LoadRealmsFailed(error)));
    });*/

  constructor(private _actions: Actions, private _api: ApiService) {}
}
