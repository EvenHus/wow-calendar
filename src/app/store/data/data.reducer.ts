import * as DataActions from './data.actions';

export type action = DataActions.All;

export interface DataState {
  loading: boolean;
  errorMessage: string;
  data: any;
}

const initalState: DataState = {
  loading: null,
  errorMessage: null,
  data: null
};

export function reducer(state: DataState = initalState, {type, payload}: action): DataState {
  switch (type) {
    case DataActions.LOAD_DATA:
      return Object.assign({}, state, {
        loading: true,
        erroMessage: null
      });
    case DataActions.LOAD_DATA_FAILURE:
      return Object.assign({}, state, {
        errorMessage: 'An error ha occurred, try again',
        loading: false
      });
    case DataActions.LOAD_DATA_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        errorMessage: null,
        data: payload
      });
    default:
      return state;
  }
}

export const getLoadingState = (state: DataState) => state.loading;
export const getErrorMessage = (state: DataState) => state.errorMessage;
export const getData = (state: DataState) => state.data;
