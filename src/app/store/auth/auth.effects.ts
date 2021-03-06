import {Injectable} from '@angular/core';
import {Effect, Actions} from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';
import {AuthService} from '../../core/auth.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthEffects {

  @Effect() register$: Observable<Action> = this._actions$.ofType(AuthActions.AUTH)
    .map((action: AuthActions.Auth) => action.payload)
    .switchMap(payload => {
      return this._service.register(payload)
        .map(result => new AuthActions.AuthSuccess(result))
        .catch(error => Observable.of(new AuthActions.AuthFailure(error)));
    });

  @Effect() auth$: Observable<Action> = this._actions$.ofType(AuthActions.IS_AUTH)
    .map((action: AuthActions.IsAuth) => action.payload)
    .switchMap(payload => {
      return this._service.authenticate(payload)
        .map(result => new AuthActions.IsAuthSuccess(result))
        .catch(error => Observable.of(new AuthActions.AuthFailure(error)));
    });

  @Effect() loadLoggedInUser$: Observable<Action> = this._actions$.ofType(AuthActions.LOAD_LOGGED_IN_USER)
    .switchMap(_ => {
      return this._service.loadLoggedInUser()
        .map(result => new AuthActions.LoadLoggedInUserSuccess(result))
        .catch(error => Observable.of(new AuthActions.LoadLoggedInUserFailure(error)));
    });


  constructor(private _actions$: Actions, private _service: AuthService) {
  }
}
