import {createSelector} from 'reselect';
import {ActionReducer, ActionReducerMap, MetaReducer} from '@ngrx/store';
import * as fromData from './data/data.reducer';
import * as fromAuth from './auth/auth.reducer';
import 'rxjs';

export interface IAppState {
  data: fromData.DataState;
  auth: fromAuth.AuthState;
}

export const reducers: ActionReducerMap<IAppState> = {
  data: fromData.reducer,
  auth: fromAuth.reducer
};

export function resetReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return function (state, action) {
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<any>[] = [resetReducer];

export const getDataState = (state: IAppState) => state.data;
export const getDataLoadingState = createSelector(getDataState, fromData.getLoadingState);
export const getDataErrorState = createSelector(getDataState, fromData.getErrorMessage);
export const getMounts = createSelector(getDataState, fromData.getMounts);
export const getProgression = createSelector(getDataState, fromData.getProgression);
export const getTitles = createSelector(getDataState, fromData.getTitles);

export const getAuthState = (state: IAppState) => state.auth;
export const getAuthLoadingState = createSelector(getAuthState, fromAuth.getLoading);
export const getAuthError = createSelector(getAuthState, fromAuth.getError);
export const getAuthentication = createSelector(getAuthState, fromAuth.getAuthentication);
export const getLoggedInUser = createSelector(getAuthState, fromAuth.getLoggedInUser);
