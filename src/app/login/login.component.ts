import {AfterContentInit, Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Store} from '@ngrx/store';
import * as rootState from '../store/index';
import * as AuthActions from '../store/auth/auth.actions';
import {Subscription} from 'rxjs/Subscription';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';

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
  regUsers: any[];
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
      console.log(data);
      this.regUsers.push(data.username);
      console.log(this.regUsers);
    });
  }

  login(): void {
    if (this.password === 'even') {
      const send = {valid: true, user: this.name, realm: this.realm};
      this.authenticated.emit(send);
    } else {
      alert('Login failed');
    }
  }

  signUp(): void {
    this._store.dispatch(new AuthActions.Auth({username: this.name, realm: this.realm, password: this.password}));
  }

}
