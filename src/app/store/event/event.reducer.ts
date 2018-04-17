import * as EventActions from './event.actions';

export type action = EventActions.All;

export interface EventState {
  loading: boolean;
  events: any;
  error: string;
}

const initalState: EventState = {
  loading: null,
  events: null,
  error: null
};

export function reducer(state: EventState = initalState, {type, payload}: action): EventState {
  switch (type) {
    case EventActions.CREATE_EVENT:
      return Object.assign({}, state, {
        loading: true,
        error: null
      });
    case EventActions.CREATE_EVENT_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        events: payload,
        error: null
      });
    case EventActions.CREATE_EVENT_FAILURE:
      return Object.assign({}, state, {
        loading: false,
        error: payload
      });
  }
}

export const getLoadingState = (state: EventState) => state.loading;
export const getErrorState = (state: EventState) => state.error;
export const getEvents = (state: EventState) => state.events;
