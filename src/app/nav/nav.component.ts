import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import * as rootState from '../store/index';
import {Observable} from 'rxjs/Observable';
import {AuthService} from '../core/auth.service';
import {Router} from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-nav',
  templateUrl: './nav.component.html'
})

export class NavComponent implements OnInit {
  isAuth$: Observable<any>;

  constructor(private _store: Store<rootState.IAppState>, private _service: AuthService) {}

  ngOnInit(): void {
    this.isAuth$ = this._store.select(rootState.getAuthenticated);
  }

  logout(): void {
    this._service.logout();
  }

}
