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

    this
  }

  createEvent(event: any): Observable<any>  {
    return Observable.fromPromise(
      this.eventRef.push(event).then(() => {
        return Observable.of('ok');
      }).catch(error => {
        return Observable.throw(error);
      })
    );
  }

  getEvents(): Observable<any> {
    this.getEventsDb$.subscribe(event => {
      console.log(event);
    });
    return Observable.of('ok');
  }
}
