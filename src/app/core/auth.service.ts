import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import 'rxjs/operator/map';
import {LocalStorageService} from 'ngx-webstorage';
import moment = require('moment');
import * as AuthActions from '../store/auth/auth.actions';
import {Store} from '@ngrx/store';
import * as rootState from '../store/index';

@Injectable()
export class AuthService {
  authRef: any;
  getAuthDb$: Observable<any>;
  user$: Observable<any[]>;

  authDbSubscription: Subscription;


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
    this._ls.store('TOKEN', moment().add(1, 'd').toString());
    return this._db.list('/auth', ref => ref.orderByChild('username').equalTo(user.username)).valueChanges()
      .map(events => {
        if (events.length > 0) {
          return events[0];
        } else {
          return Observable.throw('User do not exsist, pls register');
        }
      })
      .map((dbUser: any) => {
        if (dbUser.password !== user.password) {
          return Observable.throw('Wrong username or password');
        }
        return dbUser;
      });
  }

  checkToken(): void {
    const token = this._ls.retrieve('TOKEN');

    if (token) {
      if (moment().isAfter(token)) {
        this._store.dispatch(new AuthActions.IsAuthFailure());
        this._ls.clear('TOKEN');
        console.log('token i cleared');
      } else {
        console.log('is now');
        this._store.dispatch(new AuthActions.IsAuthSuccess());
      }
    } else {
      this._store.dispatch(new AuthActions.IsAuthFailure());
    }
  }

  logout() {
    this._ls.clear('TOKEN');
    this._store.dispatch(new AuthActions.IsAuthFailure());
  }
}
