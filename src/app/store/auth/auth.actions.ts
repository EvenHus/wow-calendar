import {Action} from '@ngrx/store';

export const AUTH = '[Auth] authenticate';
export const AUTH_SUCCESS = '[Auth] authenticate success';
export const AUTH_FAILURE = '[Auth] authenticate failure';
export const IS_AUTH = '[Auth] is authenticated';
export const IS_AUTH_SUCCESS = '[Auth] is authenticated success';
export const IS_AUTH_FAILURE = '[Auth] is authenticated failure';

export class Auth implements Action {
  readonly type = AUTH;

  constructor(public payload: any) {
  }
}

export class AuthSuccess implements Action {
  readonly type = AUTH_SUCCESS;

  constructor(public payload: any) {
  }
}

export class AuthFailure implements Action {
  readonly type = AUTH_FAILURE;

  constructor(public payload: any) {
  }
}

export class IsAuth implements Action {
  readonly type = IS_AUTH;

  constructor(public payload: any) {
  }
}

export class IsAuthSuccess implements Action {
  readonly type = IS_AUTH_SUCCESS;

  constructor(public payload: any) {
  }
}

export class IsAuthFailure implements Action {
  readonly type = IS_AUTH_FAILURE;

  constructor(public payload: any) {
  }
}

export type All = Auth | AuthSuccess | AuthFailure | IsAuth | IsAuthSuccess | IsAuthFailure;



