
import {throwError as observableThrowError, Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {fromPromise} from 'rxjs/internal-compatibility';
import {map} from 'rxjs/operators';




@Injectable()
export class EventService {
  eventRef: any;
  getEventsDb$: Observable<any>;


  constructor(private _db: AngularFireDatabase) {
    this.eventRef = _db.list('events');
    this.getEventsDb$ = _db.list('events').valueChanges();
  }

  createEvent(event: any): Observable<any>  {
    return fromPromise(
      this.eventRef.push(event).then(() => {
        return of('ok');
      }).catch(error => {
        return observableThrowError(error);
      })
    );
  }

  getEvents2(): Observable<any> {
    return this._db.list('/events').snapshotChanges()
      .pipe(map(changes => {
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        if (changes.length > 0 ) {
          return changes;
        } else {
          return observableThrowError('There are no events');
        }
      }));
  }

  getEvents(): Observable<any> {
    return this._db.list('/events').valueChanges()
      .pipe(map(events => {

        if (events.length > 0) {
          return events;
        } else {
          return observableThrowError('There are no events');
        }
      }));
  }
}
