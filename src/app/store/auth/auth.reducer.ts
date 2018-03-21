import * as AuthActions from './auth.actions';

export type action = AuthActions.All;

export interface AuthState {
  loading: boolean;
  error: string;
  authentication: boolean;
  loggedInUser: any;
}

const initialState: AuthState = {
  loading: null,
  error: null,
  authentication: null,
  loggedInUser: null
};

export function reducer(state: AuthState = initialState, {type, payload}: action): AuthState {
  switch (type) {
    case AuthActions.AUTH:
      return Object.assign({}, state, {
        loading: true,
        error: null,
        authentication: null
      });
    case AuthActions.AUTH_SUCCESS:
      console.log('auth success', payload);
      return Object.assign({}, state, {
        loading: false,
        error: null,
        authentication: true,
        loggedInUser: payload
      });
    case AuthActions.AUTH_FAILURE:
      return Object.assign({}, state, {
        loading: false,
        error: payload,
        authentication: false
      });
    case AuthActions.IS_AUTH:
      return Object.assign({}, state, {
        loading: true,
        error: null,
        authentication: null
      });
    case AuthActions.IS_AUTH_SUCCESS:
      console.log(payload);
      return Object.assign({}, state, {
        loading: false,
        error: null,
        authentication: true,
        loggedInUser: payload
      });
    case AuthActions.IS_AUTH_FAILURE:
      return Object.assign({}, state, {
        loading: false,
        error: payload,
        authentication: false
      });
    default:
      return state;
  }
}

export const getLoading = (state: AuthState) => state.loading;
export const getError = (state: AuthState) => state.error;
export const getAuthentication = (state: AuthState) => state.authentication;
export const getLoggedInUser = (state: AuthState) => state.loggedInUser;
