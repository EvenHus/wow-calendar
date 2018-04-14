import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AngularFireDatabase} from 'angularfire2/database';

@Injectable()
export class EventService {
  eventRef: any;
  getEventsDb$: Observable<any>;


  constructor(private _db: AngularFireDatabase) {
    this.eventRef = _db.list('events');
    this.getEventsDb$ = _db.list('events').valueChanges();
  }

  createEvent(event: any)  {

  }
}
