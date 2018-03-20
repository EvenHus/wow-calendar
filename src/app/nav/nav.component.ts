import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import * as rootState from '../store/index';
import {Observable} from 'rxjs/Observable';

@Component({
  moduleId: module.id,
  selector: 'app-nav',
  templateUrl: './nav.component.html'
})

export class NavComponent implements OnInit {
  isAuth$: Observable<any>;

  constructor(private _store: Store<rootState.IAppState>) {}

  ngOnInit(): void {
    this.isAuth$ = this._store.select(rootState.getAuthentication);
  }

}
