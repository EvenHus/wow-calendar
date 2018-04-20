import {Action} from '@ngrx/store';

export const CREATE_EVENT = '[Event] create event';
export const CREATE_EVENT_SUCCESS = '[Event] create event success';
export const CREATE_EVENT_FAILURE = '[Event] create event failure';

export const GET_EVENTS = '[Event] get event';
export const GET_EVENTS_SUCCESS = '[Event] get event success';
export const GET_EVENTS_FAILURE = '[Event] get event failure';

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

export class GetEvents implements Action {
  readonly type = GET_EVENTS;

  constructor(public payload?: any) {}
}

export class GetEventsSuccess implements Action {
  readonly type = GET_EVENTS_SUCCESS;

  constructor(public payload?: any) {}
}

export class GetEventsFailure implements Action {
  readonly type = GET_EVENTS_FAILURE;

  constructor(public payload?: any) {}
}

export type All = CreateEvent | CreateEventFailure | CreateEventSuccess | GetEvents | GetEventsFailure | GetEventsSuccess;
