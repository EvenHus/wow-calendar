import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';

@Injectable()
export class AuthService {
  setAuthDb: any;
  getAuthDb$: Observable<any>;



  constructor(private _db: AngularFireDatabase) {
    this.setAuthDb = _db.list('authDb');
    this.getAuthDb$ = _db.list('authDb').valueChanges();
  }

  register(user: any, regUsers: any[]): Observable<any> {
    if (regUsers.indexOf(user.username) !== -1) {
      return Observable.of(this.setAuthDb.push(user));
    } else {
      console.log('Error, can not make new user');
    }
  }

  isAuth(user: any): Observable<any> {
    if (this.regUsers.indexOf(user.username) !== -1) {
      return null;
    } else {
      return user;
    }
  }
}
