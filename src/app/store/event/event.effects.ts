import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import * as EventActions from './event.actions';
import {EventService} from '../../core/event.service';

@Injectable()
export class EventEffects {

  @Effect() createEvent$: Observable<Action> = this._actions.ofType(EventActions.CREATE_EVENT)
    .map((action: EventActions.CreateEvent) => action.payload)
    .switchMap(payload => {
      return this._service.createEvent(payload)
        .map(result => new EventActions.CreateEventSuccess(result))
        .catch(error => Observable.of(new EventActions.CreateEventFailure(error)));
    });

  @Effect() getEvents$: Observable<Action> = this._actions.ofType(EventActions.GET_EVENTS)
    .switchMap(_ => {
      return this._service.getEvents()
        .map(result => new EventActions.GetEventsSuccess(result))
        .catch(error => Observable.of(new EventActions.GetEventsFailure(error)));
    });

  constructor(private _actions: Actions, private _service: EventService) {}
}
