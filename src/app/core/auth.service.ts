import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {LocalStorageService} from 'ngx-webstorage';
import moment = require('moment');
import * as AuthActions from '../store/auth/auth.actions';
import {Store} from '@ngrx/store';
import * as rootState from '../store/index';
import 'rxjs/add/operator/map';

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
    return Observable.fromPromise(
      this.authRef.push(user).then(() => {
        this.authenticate(user);
      }).catch(error => {
        return Observable.throw(error);
      })
    );
  }

  authenticate(user: any): Observable<any> {
    return this._db.list('/auth', ref => ref.orderByChild('username').equalTo(user.username)).valueChanges()
      .map(events => {
        if (events.length > 0) {
          return events[0];
        } else {
          return Observable.throw('User do not exsist, pls register!');
        }
      })
      .map((dbUser: any) => {
        if (dbUser.password !== user.password) {
          return Observable.throw('Wrong username or password');
        }
        this.setNewToken(dbUser.username);
        return dbUser;
      });
  }

  loadLoggedInUser() {
    const token = this._ls.retrieve('TOKEN');
    if (token) {
      const username = token[1];
      return this._db.list('/auth', ref => ref.orderByChild('username').equalTo(username))
        .valueChanges()
        .map(events => {
          return events[0];
        })
        .map((dbUser: any) => {
          return dbUser;
        });
    }
  }

  checkToken(): void {
    const token = this._ls.retrieve('TOKEN');

    if (token) {
      if (moment().isAfter(token)) {
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
      const momentToken = moment().add(1, 'd').toString();
      this._ls.store('TOKEN', [momentToken, user]);
    }
  }

  logout() {
    this._ls.clear('TOKEN');
    this._store.dispatch(new AuthActions.IsAuthFailure());
  }
}
