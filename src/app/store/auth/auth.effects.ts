import {Injectable} from '@angular/core';
import {Effect, Actions, ofType} from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import {Observable, of} from 'rxjs';
import {Action} from '@ngrx/store';
import {AuthService} from '../../core/auth.service';
import {catchError, map, switchMap} from 'rxjs/operators';




@Injectable()
export class AuthEffects {

  /*@Effect() register$: Observable<Action> = this._actions$.pipe(
    ofType(AuthActions.AUTH),
    map((action: AuthActions.Auth) => action.payload),
    switchMap(payload => {
      return this._service.register(payload).pipe(
        map(result => new AuthActions.AuthSuccess(result)),
        catchError(error => of(new AuthActions.AuthFailure(error)))
      );
    })
  );

  @Effect() auth$: Observable<Action> = this._actions$.pipe(
    ofType(AuthActions.IS_AUTH),
    map((action: AuthActions.IsAuth) => action.payload),
    switchMap(payload => {
      return this._service.authenticate(payload).pipe(
        map(result => new AuthActions.IsAuthSuccess(result)),
        catchError(error => of(new AuthActions.AuthFailure(error)))
      );
    })
  );

  @Effect() loadLoggedInUser$: Observable<Action> = this._actions$.pipe(
    ofType(AuthActions.LOAD_LOGGED_IN_USER),
    switchMap(_ => {
      return this._service.loadLoggedInUser().pipe(
        map(result => new AuthActions.LoadLoggedInUserSuccess(result)),
        catchError(error => of(new AuthActions.LoadLoggedInUserFailure(error)))
      );
    })
  );*/


  constructor(private _actions$: Actions, private _service: AuthService) {
  }
}
