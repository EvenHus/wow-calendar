import {Action} from '@ngrx/store';

export const LOAD_MOUNTS = '[Data] load mounts';
export const LOAD_MOUNTS_SUCCESS = '[Data] load mounts success';
export const LOAD_MOUNTS_FAILURE = '[Data] load mounts failure';
export const LOAD_PROGRESSION = '[Data] load progression';
export const LOAD_PROGRESSION_SUCCESS = '[Data] load progression success';
export const LOAD_PROGRESSION_FAILED = '[Data] load progression failed';
export const LOAD_TITLES = '[Data] load titles';
export const LOAD_TITLES_SUCCESS = '[Data] load titles success';
export const LOAD_TITLES_FAILED = '[Data] load titles failed';
export const LOAD_REALMS = '[Data] load realms';
export const LOAD_REALMS_SUCCESS = '[Data] load realms success';
export const LOAD_REALMS_FAILED = '[Data] load realms failed';



export class LoadMounts implements Action {
  readonly type = LOAD_MOUNTS;

  constructor(public payload: any) {}
}

export class LoadMountsSuccess implements Action {
  readonly type = LOAD_MOUNTS_SUCCESS;

  constructor(public payload: any) {}
}

export class LoadMountsFailure implements Action {
  readonly type = LOAD_MOUNTS_FAILURE;

  constructor(public payload: any) {}
}

export class LoadProgression implements Action {
  readonly type = LOAD_PROGRESSION;

  constructor(public payload: any) {}
}

export class LoadProgressionSuccess implements Action {
  readonly type = LOAD_PROGRESSION_SUCCESS;

  constructor(public payload: any) {}
}

export class LoadProgressionFailed implements Action {
  readonly type = LOAD_PROGRESSION_FAILED;

  constructor(public payload: any) {}
}

export class LoadTitles implements Action {
  readonly type = LOAD_TITLES;

  constructor(public payload: any) {}
}

export class LoadTitlesSuccess implements Action {
  readonly type = LOAD_TITLES_SUCCESS;

  constructor(public payload: any) {}
}

export class LoadTitlesFailed implements Action {
  readonly type = LOAD_TITLES_FAILED;

  constructor(public payload: any) {}
}
export class LoadRealms implements Action {
  readonly type = LOAD_REALMS;

  constructor(public payload?: any) {}
}

export class LoadRealmsSuccess implements Action {
  readonly type = LOAD_REALMS_SUCCESS;

  constructor(public payload?: any) {}
}

export class LoadRealmsFailed implements Action {
  readonly type = LOAD_REALMS_FAILED;

  constructor(public payload?: any) {}
}

export type All = LoadMounts | LoadMountsFailure | LoadMountsSuccess | LoadProgression | LoadProgressionFailed |
  LoadProgressionSuccess | LoadTitles | LoadTitlesFailed | LoadTitlesSuccess | LoadRealms | LoadRealmsFailed | LoadRealmsSuccess;
