import {AfterContentInit, Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {select, Store} from '@ngrx/store';
import * as rootState from '../store/index';
import * as AuthActions from '../store/auth/auth.actions';
import * as DataActions from '../store/data/data.actions';
import {ApiService} from '../core/api.service';
import {AngularFireDatabase} from '@angular/fire/database';
import {Observable} from 'rxjs/internal/Observable';
import {Subscription} from 'rxjs/internal/Subscription';
import {MessagingService} from '../core/messaging.service';

@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit, AfterContentInit, OnDestroy {
  @ViewChild('loginForm') loginForm;
  @Output() authenticated: EventEmitter<any> = new EventEmitter();
  password: string;
  name: string;
  realm: any;
  realmList: any[] = [];
  isNotUser: boolean;
  regUsers: any[] = [];
  auth$: Observable<any>;
  loading$: Observable<any>;
  error$: Observable<any>;
  message$: Observable<any>;

  authSubscription: Subscription;
  realmSubscription: Subscription;


  constructor(private _store: Store<rootState.IAppState>, private _db: AngularFireDatabase,
              private _apiService: ApiService, private messagingService: MessagingService) {
  }

  ngOnInit(): void {
    this.auth$ = this._db.list('auth').valueChanges();
    this.loading$ = this._store.pipe(select(rootState.getAuthLoadingState));
    this.error$ = this._store.pipe(select(rootState.getAuthError));
    this.isNotUser = false;

    const userId = 'user001';
    this.messagingService.requestPermission(userId);
    this.messagingService.receiveMessage();
    this.message$ = this.messagingService.currentMessage;
  }

  ngAfterContentInit(): void {
    this.authSubscription = this.auth$.subscribe(data => {
      data.map(user => {
        this.regUsers.push(user.username);
      });
    });
    this.realmSubscription = this._store.pipe(select(rootState.getRealms)).subscribe(data => {
      if (data) {
        data.realms.map(realm => {
          this.realmList.push(realm.name);
        });
      }
    });

    this._store.dispatch(new DataActions.LoadRealms());
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

  ngOnDestroy(): void {
    if (this.realmSubscription) {
      this.realmSubscription.unsubscribe();
    }
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }


}
