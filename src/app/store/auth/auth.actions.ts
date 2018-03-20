import {Action} from '@ngrx/store';

export const AUTH = '[Auth] authenticate';
export const AUTH_SUCCESS = '[Auth] authenticate success';
export const AUTH_FAILURE = '[Auth] authenticate failure';
export const IS_AUTH = '[Auth] is authenticated';
export const IS_AUTH_SUCCESS = '[Auth] is authenticated success';
export const IS_AUTH_FAILURE = '[Auth] is authenticated failure';
export const LOAD_LOGGED_IN_USER = '[Auth] load logged in user';
export const LOAD_LOGGED_IN_USER_SUCCESS = '[Auth] load logged in user success';
export const LOAD_LOGGED_IN_USER_FAILURE = '[Auth] load logged in user failure';

export class Auth implements Action {
  readonly type = AUTH;

  constructor(public payload: any) {
  }
}

export class AuthSuccess implements Action {
  readonly type = AUTH_SUCCESS;

  constructor(public payload?: any) {
  }
}

export class AuthFailure implements Action {
  readonly type = AUTH_FAILURE;

  constructor(public payload?: any) {
  }
}

export class IsAuth implements Action {
  readonly type = IS_AUTH;

  constructor(public payload: any) {
  }
}

export class IsAuthSuccess implements Action {
  readonly type = IS_AUTH_SUCCESS;

  constructor(public payload?: any) {
  }
}

export class IsAuthFailure implements Action {
  readonly type = IS_AUTH_FAILURE;

  constructor(public payload?: any) {
  }
}

export class LoadLoggedInUser implements Action {
  readonly type = LOAD_LOGGED_IN_USER;

  constructor(public payload?: any) {

  }
}

export class LoadLoggedInUserSuccess implements Action {
  readonly type = LOAD_LOGGED_IN_USER_SUCCESS;

  constructor(public payload?: any) {

  }
}

export class LoadLoggedInUserFailure implements Action {
  readonly type = LOAD_LOGGED_IN_USER_FAILURE;

  constructor(public payload?: any) {

  }
}

export type All = Auth | AuthSuccess | AuthFailure | IsAuth | IsAuthSuccess | IsAuthFailure | LoadLoggedInUser
  | LoadLoggedInUserFailure | LoadLoggedInUserSuccess;



