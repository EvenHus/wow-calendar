import {Component, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {NavigationStart, Router} from '@angular/router';
import {Subscription, Observable, Subject, combineLatest} from 'rxjs';
import {Store} from '@ngrx/store';
import * as rootState from './store/index';
import {AuthService} from './core/auth.service';
import * as AuthActions from './store/auth/auth.actions';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {
  authSubscription: Subscription;
  routerEventSubscription: Subscription;
  currentUrl$: Subject<string> = new Subject();

  constructor(private _router: Router, private _store: Store<rootState.IAppState>,
              private _authService: AuthService) {
  }

  ngOnInit(): void {
    this.routerEventSubscription = this._router.events.pipe(map(event => this._setCurrentUrl(event))).subscribe();

    const isAuthenticated$ = this._store.select(rootState.getAuthenticated)
      .pipe(map(isAuthenticated => {
        return this._handleIsAuthenticated(isAuthenticated);
      }));
    const loggedInUser$ = this._store.select(rootState.getLoggedInUser);

    this.authSubscription = combineLatest(this.currentUrl$, isAuthenticated$, loggedInUser$)
      .pipe(map(value => ({
        currentUrl: value[0],
        isAuthenticated: value[1],
        loggedInUser: value[2]
      })))
      .subscribe(values => {
        this._handleRoute(values.currentUrl, values.isAuthenticated, values.loggedInUser);
      });

    this._authService.checkToken();
  }

  ngOnDestroy(): void {
    if (this.routerEventSubscription) {
      this.routerEventSubscription.unsubscribe();
    }
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  private _setCurrentUrl(event): void {
    if (event instanceof NavigationStart) {
      this.currentUrl$.next(event.url);
    }
  }

  private _handleIsAuthenticated(isAuthenticated: boolean): boolean {
    if (isAuthenticated !== null) {
      if (isAuthenticated) {
        this._store.dispatch(new AuthActions.LoadLoggedInUser());
      }

      return isAuthenticated;
    }
  }

  private _handleRoute(currentUrl: string, isAuthenticated: boolean, loggedInUser: any): void {
    if (isAuthenticated) {
      if (loggedInUser && currentUrl) {
        const routes = ['/', '/login'];
        const redirect = routes.indexOf(currentUrl) !== -1;
        if (redirect) {
          this._router.navigate(['home']);
        }
      }
    } else {
      if (currentUrl) {
        if (currentUrl !== '/login') {
          this._router.navigate(['login']);
        }
      }
    }
  }
}
