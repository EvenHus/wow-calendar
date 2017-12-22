import {Injectable} from '@angular/core';
import {Effect, Actions} from '@ngrx/effects';
import * as DataActions from './data.actions';
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';
import {ApiService} from '../../core/api.service';
import 'rxjs/add/operator/map';

@Injectable()
export class DataEffects {

  @Effect() loadDataEffect$: Observable<Action> = this._actions.ofType(DataActions.LOAD_DATA)
    .map((action: DataActions.LoadData) => action.payload)
    .switchMap(payload => {
      return this._api.getData(payload)
        .map(result => new DataActions.LoadDataSuccess(result))
        .catch(response => Observable.of(new DataActions.LoadDataFailure(response)));
    });

  constructor(private _actions: Actions, private _api: ApiService) {}
}
