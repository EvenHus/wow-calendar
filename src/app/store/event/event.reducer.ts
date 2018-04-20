import * as EventActions from './event.actions';

export type action = EventActions.All;

export interface EventState {
  loading: boolean;
  events: any;
  error: string;
}

const initialState: EventState = {
  loading: null,
  events: null,
  error: null
};

export function reducer(state: EventState = initialState, {type, payload}: action): EventState {
  switch (type) {
    case EventActions.CREATE_EVENT:
      return Object.assign({}, state, {
        loading: true,
        error: null
      });
    case EventActions.CREATE_EVENT_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        error: null
      });
    case EventActions.CREATE_EVENT_FAILURE:
      return Object.assign({}, state, {
        loading: false,
        error: payload
      });
    case EventActions.GET_EVENTS:
      return Object.assign({}, state, {
        loading: true,
        error: null,
        events: null
      });
    case EventActions.GET_EVENTS_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        events: payload,
        error: null
      });
    case EventActions.GET_EVENTS_FAILURE:
      return Object.assign({}, state, {
        loading: false,
        error: payload
      });
    default:
      return state;
  }
}

export const getLoadingState = (state: EventState) => state.loading;
export const getErrorState = (state: EventState) => state.error;
export const getEvents = (state: EventState) => state.events;
