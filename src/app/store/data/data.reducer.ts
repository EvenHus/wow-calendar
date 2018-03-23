import * as DataActions from './data.actions';

export type action = DataActions.All;

export interface DataState {
  loading: boolean;
  errorMessage: string;
  mounts: any;
  progression: any;
  titles: any;
  realms: any;
}

const initalState: DataState = {
  loading: null,
  errorMessage: null,
  mounts: null,
  progression: null,
  titles: null,
  realms: null
};

export function reducer(state: DataState = initalState, {type, payload}: action): DataState {
  switch (type) {
    case DataActions.LOAD_MOUNTS:
      return Object.assign({}, state, {
        loading: true,
        erroMessage: null
      });
    case DataActions.LOAD_MOUNTS_FAILURE:
      return Object.assign({}, state, {
        errorMessage: 'An error ha occurred, try again',
        loading: false
      });
    case DataActions.LOAD_MOUNTS_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        errorMessage: null,
        mounts: payload
      });
    case DataActions.LOAD_PROGRESSION:
      return Object.assign({}, state, {
        loading: true,
        errorMessage: null
      });
    case DataActions.LOAD_PROGRESSION_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        errorMessage: null,
        progression: payload
      });
    case DataActions.LOAD_PROGRESSION_FAILED:
      return Object.assign({}, state, {
        loading: false,
        errorMessage: 'An error occurred' + payload,
      });
    case DataActions.LOAD_TITLES:
      return Object.assign({}, state, {
        loading: true,
        errorMessage: null
      });
    case DataActions.LOAD_TITLES_FAILED:
      return Object.assign({}, state, {
        loading: false,
        errorMessage: 'An error occurred' + payload
      });
    case DataActions.LOAD_TITLES_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        titles: payload,
        errorMessage: null
      });
    case DataActions.LOAD_REALMS:
      return Object.assign({}, state, {
        loading: true,
        errorMessage: null
      });
    case DataActions.LOAD_REALMS_FAILED:
      return Object.assign({}, state, {
        loading: false,
        errorMessage: 'An error occurred' + payload
      });
    case DataActions.LOAD_REALMS_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        realms: payload,
        errorMessage: null
      });
    default:
      return state;
  }
}

export const getLoadingState = (state: DataState) => state.loading;
export const getErrorMessage = (state: DataState) => state.errorMessage;
export const getMounts = (state: DataState) => state.mounts;
export const getProgression = (state: DataState) => state.progression;
export const getTitles = (state: DataState) => state.titles;
export const getRealms = (state: DataState) => state.realms;
