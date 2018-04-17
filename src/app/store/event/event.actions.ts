import {Action} from '@ngrx/store';

export const CREATE_EVENT = '[Event] create event';
export const CREATE_EVENT_SUCCESS = '[Event] create event success';
export const CREATE_EVENT_FAILURE = '[Event] create event failure';

export class CreateEvent implements Action {
  readonly type = CREATE_EVENT;

  constructor(public payload: any) {}
}

export class CreateEventSuccess implements Action {
  readonly type = CREATE_EVENT_SUCCESS;

  constructor(public payload?: any) {}
}

export class CreateEventFailure implements Action {
  readonly type = CREATE_EVENT_FAILURE;

  constructor(public payload?: any) {}
}

export type All = CreateEvent | CreateEventFailure | CreateEventSuccess;
