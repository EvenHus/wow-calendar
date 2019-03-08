import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import * as rootState from '../store/index';
import {Observable, Subscription} from 'rxjs';
import {AuthService} from '../core/auth.service';
import {Router} from '@angular/router';
import {ApiService} from '../core/api.service';

@Component({
  moduleId: module.id,
  selector: 'app-nav',
  templateUrl: './nav.component.html'
})

export class NavComponent implements OnInit, OnDestroy {
  isAuth$: Observable<any>;
  showSubMenu: boolean;
  subMenuXPosition: string;
  profileImage: string;
  username: string;

  userSubscription: Subscription;

  constructor(private _store: Store<rootState.IAppState>, private _service: AuthService, private _apiService: ApiService) {
  }

  ngOnInit(): void {
    this.isAuth$ = this._store.select(rootState.getAuthenticated);
    this.setSubMenuPosition();
    this.userSubscription = this._store.select(rootState.getLoggedInUser).subscribe(user => {
      if (user) {
        this.username = user.username;
        this._apiService.getProfile(user.username, user.realm).subscribe(data => {
          this.profileImage = 'https://render-eu.worldofwarcraft.com/character/' + data.thumbnail;
        });
      }
    });
  }

  logout(): void {
    this._service.logout();
    this.toggleShowSubMenu();
  }

  toggleShowSubMenu(): void {
    this.showSubMenu = !this.showSubMenu;
  }

  setSubMenuPosition(): void {
    const navLoggedInUser = document.getElementById('nav__logged-in-user');
    if (navLoggedInUser) {
      this.subMenuXPosition = (navLoggedInUser.offsetLeft - 70) + 'px';
    }
  }

  ngOnDestroy(): void {
    this.profileImage = '';

    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

}
