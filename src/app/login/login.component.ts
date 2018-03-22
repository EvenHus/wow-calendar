import {AfterContentInit, Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Store} from '@ngrx/store';
import * as rootState from '../store/index';
import * as AuthActions from '../store/auth/auth.actions';
import {Subscription} from 'rxjs/Subscription';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

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
  isNotUser: boolean;
  regUsers: any[] = [];
  auth$: Observable<any>;
  loading$: Observable<any>;
  error$: Observable<any>;

  authSubscription: Subscription;


  constructor(private _store: Store<rootState.IAppState>, private _db: AngularFireDatabase) {
  }

  ngOnInit(): void {
    this.auth$ = this._db.list('auth').valueChanges();
    this.loading$ = this._store.select(rootState.getAuthLoadingState);
    this.error$ = this._store.select(rootState.getAuthError);
    this.isNotUser = false;
  }

  ngAfterContentInit(): void {
    this.authSubscription = this.auth$.subscribe(data => {
      data.map(user => {
        this.regUsers.push(user.username);
      });
    });
  }


  onUsernameChange(username: any): void {
    if (this.regUsers.indexOf(this.name) !== -1) {
      this.isNotUser = false;
    } else {
      this.isNotUser = true;
    }
  }

  login(): void {
    this.name.toLowerCase();
    this.realm.toLowerCase();
    const encryptedPassword = btoa(this.password);
    this._store.dispatch(new AuthActions.IsAuth({
      username: this.name, realm: this.realm, password: encryptedPassword
    }));
  }

  signUp(): void {
    if (this.regUsers.indexOf(this.name) !== -1) {
      alert('That username allready exist');
    } else {
      const encryptedPassword = btoa(this.password);
      this._store.dispatch(new AuthActions.Auth({
        username: this.name, realm: this.realm, password: encryptedPassword
      }));
    }
  }

}
