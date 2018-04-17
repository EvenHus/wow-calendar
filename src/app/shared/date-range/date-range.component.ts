import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import * as Moment from 'moment';
import { extendMoment } from 'moment-range';
const moment = extendMoment(Moment);
import 'moment-range';

@Component({
  moduleId: module.id,
  selector: 'app-date-range',
  templateUrl: './date-range.component.html'
})

export class DateRangeComponent implements OnChanges, OnInit {
  @Input() startDate: string;
  @Input() endDate: string;
  @Input() selectedDate: any;
  @Output() onDateSelected: EventEmitter<any> = new EventEmitter();
  dateRange: any[];
  now: any;
  today: any;

  constructor() {
  }

  ngOnInit(): void {
    this._createDateRange();
    this.today = moment().format('YYYY-MM-DD');

    if (this.dateRange.length > 0) {
      if (!this.selectedDate) {
        this.selectedDate = this.now;
      }
    }
  }

  ngOnChanges(): void {

    this._createDateRange();
  }

  setSelectedDate(date: any): void {
    this.selectedDate = date;
    this.onDateSelected.emit(date.fullDate);
  }

  private _createDateRange() {
    this.dateRange = [];


    const range = moment.range(this.startDate, this.endDate);
    const dates = Array.from(range.by('day'));

    dates.map((date: any) => {
      this.dateRange.push({
        fullDate: date.format('YYYY-MM-DD'),
        weekday: date.format('ddd'),
        day: date.format('D'),
        month: date.format('M'),
        occurrences: []
      });

      if (date.format('YYYY-MM-DD' === moment().format('YYYY-MM-DD'))) {
        this.now = this.dateRange;
      } else if (date.format('YYYY-MM-DD') === moment(this.startDate).format('YYYY-MM-DD')) {
        this.selectedDate = this.dateRange;
      }
    });



  }

  private _addLeadingDatesFromPrevMonth(dates: any[]): any[] {
    const firstDay = dates[0].isoWeekday;
    const numDaysToAdd = (firstDay % 8) - 1;

    for (let i = 0; i < numDaysToAdd; i++) {
      dates = [].concat({}, ...dates);
    }

    return dates;
  }
}
