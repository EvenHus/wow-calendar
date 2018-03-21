import {Component, OnChanges, OnInit} from '@angular/core';
import {NavigationStart, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {Store} from '@ngrx/store';
import * as rootState from './store/index';
import {AuthService} from './core/auth.service';
import {LocalStorageService} from 'ngx-webstorage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  isLoggedIn: boolean;
  authSubscription: Subscription;
  routerEventSubscription: Subscription;

  constructor(private _router: Router, private _store: Store<rootState.IAppState>,
              private _authService: AuthService, private _ls: LocalStorageService) {
  }

  ngOnInit(): void {
    this.authSubscription = this._store.select(rootState.getAuthentication).subscribe(authenticated => {
      console.log(authenticated);
      if (!authenticated) {
        this._router.navigate(['login']);
      } else {
        this._authService.checkToken();
        this._router.navigate(['home']);
      }
    });
  }

  private _handleAuthentication(): void {
    this.routerEventSubscription = this._router.events.subscribe(events => {
      if (events instanceof NavigationStart && events.url !== '/login') {
        this._authService.checkToken();
      }
    });
  }
}
