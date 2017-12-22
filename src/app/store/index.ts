import {createSelector} from 'reselect';
import {ActionReducer, ActionReducerMap, MetaReducer} from '@ngrx/store';
import * as fromData from './data/data.reducer';
import 'rxjs';


export interface IAppState {
  data: fromData.DataState;
}

export const reducers: ActionReducerMap<IAppState> = {
  data: fromData.reducer
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
export const getDataContentState = createSelector(getDataState, fromData.getData);

