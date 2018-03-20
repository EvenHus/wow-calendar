import {AfterContentInit, Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Store} from '@ngrx/store';
import * as rootState from '../store/index';
import * as AuthActions from '../store/auth/auth.actions';
import {Subscription} from 'rxjs/Subscription';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import 'rxjs/operator/map';
import moment = require('moment');

@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit, AfterContentInit {
  @ViewChild('loginForm') loginForm;
  @Output() authenticated: EventEmitter<any> = new EventEmitter();
  password: string;
  name: string;
  realm: string;
  isAuthenticated: boolean;
  regUsers: any[] = [];
  getAuthDb$: Observable<any>;

  authDbSub: Subscription;


  constructor(private _store: Store<rootState.IAppState>, private _db: AngularFireDatabase) {}

  ngOnInit(): void {
    this._store.select(rootState.getAuthentication).subscribe(data => {
      if (data === null) {
        console.log('not authenticated');
        this.isAuthenticated = false;
      } else {
        console.log(data);
        this.isAuthenticated = true;
      }
    });
    this.getAuthDb$ = this._db.list('authDb').valueChanges();
  }

  ngAfterContentInit(): void {
    this.authDbSub = this.getAuthDb$.subscribe(data => {
      data.map(user => {
        this.regUsers.push(user.username);
      });
    });
  }

  login(): void {
    this.name.toLowerCase();
    this.realm.toLowerCase();
    if (this.regUsers.indexOf(this.name) !== -1) {
      alert('That username allready exist');
    } else {
      this._store.dispatch(new AuthActions.IsAuth({
        username: this.name, realm: this.realm, password: this.password
      }));
    }
  }

  signUp(): void {
    this._store.dispatch(new AuthActions.Auth({
      username: this.name, realm: this.realm, password: this.password, timetoken: moment().add(1, 'h').toString()
    }));
  }

}
