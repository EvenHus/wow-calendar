import * as AuthActions from './auth.actions';

export type action = AuthActions.All;

export interface AuthState {
  loading: boolean;
  error: string;
  user: any;
}

const initialState: AuthState = {
  loading: null,
  error: null,
  user: null
};

export function reducer(state: AuthState = initialState, {type, payload}: action): AuthState {
  switch (type) {
    case AuthActions.AUTH:
      return Object.assign({}, state, {
        loading: true,
        error: null,
        user: null
      });
    case AuthActions.AUTH_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        error: null,
        user: payload
      });
    case AuthActions.AUTH_FAILURE:
      return Object.assign({}, state, {
        loading: false,
        error: 'Error with creating',
        user: null
      });
    case AuthActions.IS_AUTH:
      return Object.assign({}, state, {
        loading: true,
        error: null,
        user: null
      });
    case AuthActions.IS_AUTH_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        error: null,
        user: payload
      });
    case AuthActions.IS_AUTH_FAILURE:
      return Object.assign({}, state, {
        loading: false,
        error: 'Error with creating',
        user: null
      });
    default:
      return state;
  }
}

export const getLoading = (state: AuthState) => state.loading;
export const getError = (state: AuthState) => state.error;
export const getUser = (state: AuthState) => state.user;
