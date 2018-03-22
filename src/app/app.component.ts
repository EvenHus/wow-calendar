import {Component, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {NavigationStart, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {Store} from '@ngrx/store';
import * as rootState from './store/index';
import {AuthService} from './core/auth.service';
import * as AuthActions from './store/auth/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {
  authSubscription: Subscription;
  routerEventSubscription: Subscription;
  currentUrl: string;

  constructor(private _router: Router, private _store: Store<rootState.IAppState>,
              private _authService: AuthService) {
  }

  ngOnInit(): void {
   this._setCurrentUrl(this._router.events);
   this._checkAuthentication();
   this._handleAuthentication();
   this._store.dispatch(new AuthActions.LoadLoggedInUser());
  }

  ngOnDestroy(): void {
    if (this.routerEventSubscription) {
      this.routerEventSubscription.unsubscribe();
    }
  }

  private _setCurrentUrl(event): void {
    if (event instanceof NavigationStart) {
      this.currentUrl = event.url;
      console.log(this.currentUrl);
    }
  }

  private _checkAuthentication(): void {
    this.authSubscription = this._store.select(rootState.getAuthenticated).subscribe(isAuthenticated => {
      if (isAuthenticated !== null) {
        if (isAuthenticated) {
          this._router.navigate(['home']);
        } else {
          this._router.navigate(['login']);
        }
      }
    });
  }

  private _handleAuthentication(): void {
    this.routerEventSubscription = this._router.events.subscribe(events => {
      if (events instanceof NavigationStart) {
        if (events.url !== '/login') {
          this._authService.checkToken();
        }
      }
    });
  }
}
