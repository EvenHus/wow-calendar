import {Component, OnChanges, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import * as rootState from '../store/index';
import * as EventActions from '../store/event/event.actions';
import {EventService} from '../core/event.service';
import * as moment from 'moment';
@Component({
  moduleId: module.id,
  selector: 'app-calendar',
  templateUrl: './team-calendar.html'
})

export class TeamCalendarComponent implements OnInit, OnChanges {
  startDate: any;
  endDate: any;
  today: any;

  dateView: string;
  events: any;

  weekDays: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];


  constructor(private _store: Store<rootState.IAppState>, private _eventService: EventService) {
  }

  ngOnInit(): void {
    this.startDate = moment().startOf('month').startOf('day');
    this.endDate = moment().endOf('month').endOf('day');
    this.today = {fullDate: moment().format('YYYY-MM-DD')};
    this.calendarChanges();
    this.getEvents();
    this._store.select(rootState.getEventError).subscribe(event => console.log(event));
  }

  ngOnChanges(): void {
    this.calendarChanges();
  }

  prev(): void {
    this.startDate = moment(this.startDate).subtract(1, 'month');
    this.endDate = moment(this.endDate).subtract(1, 'month');
    this.calendarChanges();
  }

  goToToday(): void {
    this.startDate = moment().startOf('month').startOf('day');
    this.endDate = moment().endOf('month').endOf('day');
    this.calendarChanges();
  }

  next(): void {
    this.startDate = moment(this.startDate).add(1, 'month');
    this.endDate = moment(this.endDate).add(1, 'month');
    this.calendarChanges();
  }

  createEvent(event: any) {
    this._store.dispatch(new EventActions.CreateEvent(event));
  }

  getEvents(): void {
    this._store.select(rootState.getEvents).subscribe(events => {
      if (events) {
        this.events = events;
      }
    });
    this._store.dispatch(new EventActions.GetEvents());
  }

  calendarChanges() {
    this.dateView = moment(this.startDate).format('MMMM');
  }

  onDateClicked(date: any): void {
    //on date click, view that day with events in viewer above page!
  }
}
