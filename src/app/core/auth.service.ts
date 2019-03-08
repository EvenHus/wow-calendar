
import {throwError as observableThrowError, Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {LocalStorageService} from 'ngx-webstorage';
import * as moment from 'moment';
import {Store} from '@ngrx/store';
import * as AuthActions from '../store/auth/auth.actions';
import * as rootState from '../store/index';
import {fromPromise} from 'rxjs/internal-compatibility';
import {AngularFireDatabase} from '@angular/fire/database';
import {map} from 'rxjs/operators';




@Injectable()
export class AuthService {
  authRef: any;
  getAuthDb$: Observable<any>;

  constructor(private _db: AngularFireDatabase, private _ls: LocalStorageService,
              private _store: Store<rootState.IAppState>) {
    this.authRef = _db.list('auth');
    this.getAuthDb$ = _db.list('auth').valueChanges();
  }

  register(user: any) {
    return fromPromise(
      this.authRef.push(user).then(() => {
        this.authenticate(user);
      }).catch(error => {
        return observableThrowError(error);
      })
    );
  }

  authenticate(user: any): Observable<any> {
    return this._db.list('/auth', ref => ref.orderByChild('username').equalTo(user.username)).valueChanges()
      .pipe(map((events: any) => {
        if (events.length > 0) {
          return events[0];
        } else {
          return observableThrowError('User do not exsist, pls register!');
        }
      }),
      map((dbUser: any) => {
        if (dbUser.password !== user.password) {
          return observableThrowError('Wrong username or password');
        }
        this.setNewToken(dbUser.username);
        return dbUser;
      }));
  }

  loadLoggedInUser() {
    const token = this._ls.retrieve('TOKEN');
    if (token) {
      const username = token[1];
      return this._db.list('/auth', ref => ref.orderByChild('username').equalTo(username))
        .valueChanges()
        .pipe(map(events => {
          return events[0];
        }),
        map((dbUser: any) => {
          return dbUser;
        }));
    }
  }

  checkToken() {
    const token = this._ls.retrieve('TOKEN');

    if (token) {
      const tokenMoment = token[0];
      if (moment().isAfter(tokenMoment)) {
        this._store.dispatch(new AuthActions.IsAuthFailure());
        this._ls.clear('TOKEN');
      } else {
        this._store.dispatch(new AuthActions.IsAuthSuccess());
      }
    } else {
      this._store.dispatch(new AuthActions.IsAuthFailure());
    }
  }

  setNewToken(user: any): void {
    const token = this._ls.retrieve('TOKEN');
    if (!token) {
      const momentToken = moment().add(1, 'd').toISOString();
      this._ls.store('TOKEN', [momentToken, user]);
    }
  }

  logout() {
    this._ls.clear('TOKEN');
    this._store.dispatch(new AuthActions.IsAuthFailure());
  }
}
