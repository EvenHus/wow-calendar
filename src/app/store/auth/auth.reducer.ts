import * as AuthActions from './auth.actions';

export type action = AuthActions.All;

export interface AuthState {
  loading: boolean;
  error: string;
  authenticated: boolean;
  loggedInUser: any;
}

const initialState: AuthState = {
  loading: null,
  error: null,
  authenticated: null,
  loggedInUser: null
};

export function reducer(state: AuthState = initialState, {type, payload}: action): AuthState {
  switch (type) {
    case AuthActions.AUTH:
      return Object.assign({}, state, {
        loading: true,
        error: null,
        authenticated: null
      });
    case AuthActions.AUTH_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        error: null,
        authenticated: true,
      });
    case AuthActions.AUTH_FAILURE:
      return Object.assign({}, state, {
        loading: false,
        error: payload,
        authenticated: false
      });
    case AuthActions.IS_AUTH:
      return Object.assign({}, state, {
        loading: true,
        error: null,
        authenticated: null
      });
    case AuthActions.IS_AUTH_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        error: null,
        authenticated: true,
      });
    case AuthActions.IS_AUTH_FAILURE:
      return Object.assign({}, state, {
        loading: false,
        error: payload,
        authenticated: false
      });
    case AuthActions.LOAD_LOGGED_IN_USER:
      return Object.assign({}, state, {
        loading: true,
        error: null,
      });
    case AuthActions.LOAD_LOGGED_IN_USER_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        error: null,
        loggedInUser: payload
      });
    case AuthActions.LOAD_LOGGED_IN_USER_FAILURE:
      return Object.assign({}, state, {
        loading: false,
        error: payload,
      });
    default:
      return state;
  }
}

export const getLoading = (state: AuthState) => state.loading;
export const getError = (state: AuthState) => state.error;
export const getAuthenticated = (state: AuthState) => state.authenticated;
export const getLoggedInUser = (state: AuthState) => state.loggedInUser;
