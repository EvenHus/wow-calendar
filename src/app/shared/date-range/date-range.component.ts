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
    this.today = moment().format('YYYY-MM-DD');
  }

  ngOnChanges(): void {
    this.dateRange = this._createDateRange();
  }

  setSelectedDate(date: any): void {
    this.selectedDate = date;
    this.onDateSelected.emit(date.fullDate);
  }

  private _createDateRange() {
    const start = moment(this.startDate).startOf('month').startOf('day');
    const end = moment(this.endDate).endOf('month').endOf('day');
    const range = moment.range(start, end);
    const dates = Array.from(range.by('day'));

    let dateRange = dates.map((date: any) => ({
        fullDate: date.format('YYYY-MM-DD'),
        weekday: date.format('ddd'),
        isoWeekday: date.isoWeekday(),
        day: date.format('D'),
        month: date.format('M'),
        occurrences: []
      }));

    if (dateRange[0].isoWeekday !== 1) {
      dateRange = this._addLeadingDatesFromPrevMonth(dateRange);
    }

    return dateRange;

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
