import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AngularFireDatabase} from 'angularfire2/database';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/throw';

@Injectable()
export class EventService {
  eventRef: any;
  getEventsDb$: Observable<any>;


  constructor(private _db: AngularFireDatabase) {
    this.eventRef = _db.list('events');
    this.getEventsDb$ = _db.list('events').valueChanges();
  }

  createEvent(event: any): Observable<any>  {
    return Observable.fromPromise(
      this.eventRef.push(event).then(() => {
        return this.getEventsDb$;
      }).catch(error => {
        return Observable.throw(error);
      })
    );
  }
}
