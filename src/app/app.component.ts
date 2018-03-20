import {Component, OnChanges, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {Store} from '@ngrx/store';
import * as rootState from './store/index';
import {AuthService} from './core/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  isLoggedIn: boolean;
  authSubscription: Subscription;

  constructor(private _router: Router, private _store: Store<rootState.IAppState>,
              private _authService: AuthService) {
  }

  ngOnInit(): void {
    this.authSubscription = this._store.select(rootState.getAuthentication).subscribe(authenticated => {
      if (!authenticated) {
        this._router.navigate(['login']);
      } else {
        this._router.navigate(['home']);
      }
    });
    this._authService.checkTimeToken();
  }
}
