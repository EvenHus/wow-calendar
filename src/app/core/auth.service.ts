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
  setAuthDb: any;
  getAuthDb$: Observable<any>;

  authDbSubscription: Subscription;


  constructor(private _db: AngularFireDatabase, private _ls: LocalStorageService,
              private _store: Store<rootState.IAppState>) {
    this.setAuthDb = _db.list('authDb');
    this.getAuthDb$ = _db.list('authDb').valueChanges();
  }

  register(user: any) {
    this._ls.store('TIME_TOKEN', user.timetoken);
    this.setAuthDb.push(user);
    return Observable.of(true);
  }

  isAuthorised(user: any) {
    const dbUser = this._db.list('/authDb', ref => ref.orderByChild('username').equalTo(user.username));
    console.log(dbUser);
    //return Observable.throw('You do not have a user account, you need to register first.');

  }

  checkTimeToken(): void {
    const timetoken = this._ls.retrieve('TIME_TOKEN');

    if (timetoken) {
      if (moment().isAfter(timetoken)) {
        this._store.dispatch(new AuthActions.IsAuthFailure());
        this._ls.clear('TIME_TOKEN');
      } else {
        console.log('is now');
        this._store.dispatch(new AuthActions.IsAuthSuccess());
      }
    } else {
      this._store.dispatch(new AuthActions.IsAuthFailure());
    }
  }
}
