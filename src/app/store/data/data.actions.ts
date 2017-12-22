import {Action} from '@ngrx/store';

export const LOAD_DATA = '[Data] load data';
export const LOAD_DATA_SUCCESS = '[Data] load data success';
export const LOAD_DATA_FAILURE = '[Data] load data failure';

export class LoadData implements Action {
  readonly type = LOAD_DATA;

  constructor(public payload: any) {}
}

export class LoadDataSuccess implements Action {
  readonly type = LOAD_DATA_SUCCESS;

  constructor(public payload: any) {}
}

export class LoadDataFailure implements Action {
  readonly type = LOAD_DATA_FAILURE;

  constructor(public payload: any) {}
}

export type All = LoadData | LoadDataFailure | LoadDataSuccess;
