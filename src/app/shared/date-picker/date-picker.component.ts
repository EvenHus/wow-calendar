import {
  Component, ElementRef, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output,
  ViewChild
} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import * as Moment from 'moment';
import { extendMoment } from 'moment-range';
import {Subscription} from 'rxjs';
const moment = extendMoment(Moment);

@Component({
  moduleId: module.id,
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html'
})
export class DatePickerComponent implements OnInit, OnDestroy {
  @ViewChild('hourList') hourList: ElementRef;
  @Input() type: string; // date or datetime
  @Input() date: any;
  @Input() blankInitialDate = false;
  @Output() onDateChanged: EventEmitter<any> = new EventEmitter();

  selectedDate: any;
  calendarVisible: boolean;
  timeVisible: boolean;
  month: string;
  year: string;
  dateRange: any[];
  displayDate: string;
  displayTime: string;
  navSubscription: Subscription;
  selectedDateIsValid: boolean;
  hours: string[];
  currentHour: string;
  selectYear: boolean;
  years: string[];
  militaryTimeRegexp = /^(?:[0-1]?[0-9]|2[0-3])(?::[0-5][0-9])?$/;

  constructor(private _translate: TranslateService) {}

  @HostListener('document:click', ['$event'])
  onDocumentClick(event): void {
    if (this.calendarVisible && event.target.className.indexOf('date-picker') === -1) {
      this.hideCalendar();
    }

    if (this.timeVisible && event.target.className.indexOf('time-picker') === -1) {
      this.hideTime();
    }
  }

  ngOnInit(): void {
    this.hours = this._generateHourOptions();
    this.years = this._generateYearOptions();

    const date = (this.date) ? moment(this.date) : moment();
    this._setInitialDate(date);
    this.validateDate(this.selectedDate.iso);

    if (!this.blankInitialDate) {
      this.displayDate = this._setDisplayDate();
      this.displayTime = moment(this.selectedDate.iso).format('HH:mm');
    }

    this._updateCalendar();
  }

  toggleSelectYear(): void {
    if (this.selectYear) {
      this.selectYear = false;
    } else {
      this.selectYear = true;
    }
  }

  showCalendar(): void {
    this.calendarVisible = true;
  }

  hideCalendar(): void {
    this.calendarVisible = false;
  }

  showTime(): void {
    this.timeVisible = true;

    // Scroll hour selection to current time
    this.currentHour = moment(this.selectedDate.iso).format('HH').toString();

    setTimeout(() => {
      if (this.hourList) {
        const hourElem = document.getElementById(`hour-${this.currentHour}`);
        this.hourList.nativeElement.scrollTop = hourElem.offsetTop;
      }
    }, 0);
  }

  hideTime(): void {
    this.timeVisible = false;
  }

  prev(): void {
    this.date = moment(this.date).subtract(1, 'month').toISOString();
    this._updateCalendar();
  }

  next(): void {
    this.date = moment(this.date).add(1, 'month').toISOString();
    this._updateCalendar();
  }

  today(): void {
    this._setInitialDate(moment());

    const start = moment().startOf('month').startOf('isoWeek');
    const end = moment().endOf('month');
    this.dateRange = this._createDateRange(start, end);
  }

  selectDate(date: any): void {
    const currentHour = moment(this.date).format('HH');
    const currentMinute = moment(this.date).format('mm');
    date.iso = moment(date.iso).set('hour', currentHour).toISOString();
    date.iso = moment(date.iso).set('minute', currentMinute).toISOString();

    this.selectedDate = date;
    this.date = this.selectedDate.iso;
    this.displayDate = this._setDisplayDate();
    this.validateDate(this.selectedDate.iso);

    this.onDateChanged.emit(this.selectedDate.iso);
    this.hideCalendar();
  }

  selectTime(selected: any): void {
    const date = moment(this.selectedDate.iso);
    date.set({
      hour: selected.hour,
      minute: selected.minutes
    });

    this.selectedDate = this._updateSelectedDate(date);
    this.displayTime = moment(this.selectedDate.iso).format('HH:mm');

    this.validateDate(this.selectedDate.iso);
    this.onDateChanged.emit(this.selectedDate.iso);
    this.hideTime();
  }

  setYear(year: number): void {
    const newDate = moment(this.date).toDate();
    newDate.setFullYear(year);
    this._setInitialDate(moment(newDate));
    this._updateCalendar();
    this.toggleSelectYear();
  }

  validateDate(updated: string): void {
    const date = moment(updated);
    this.selectedDateIsValid = date.isValid();
  }

  validateTime(updated: string): void {
    if (updated.match(this.militaryTimeRegexp)) {
      const time = updated.split(':');
      this.selectTime({ hour: time[0], minutes: time[1] });
    }
  }

  ngOnDestroy(): void {
    if (this.navSubscription) {
      this.navSubscription.unsubscribe();
    }
  }

  private _updateCalendar(): void {
    const start = moment(this.date).startOf('month');
    const end = moment(this.date).endOf('month');

    this.month = this._translate.instant(start.format('MMMM'));
    this.year = start.format('YYYY');
    this.dateRange = this._createDateRange(start, end);
  }

  private _setInitialDate(date): void {
    this.date = date.toISOString();
    this.selectedDate = this._updateSelectedDate(date);

    this.month = this._translate.instant(moment(this.date).format('MMMM'));
    this.year = moment(this.date).format('YYYY');
  }

  // Translates the selected date into a more human friendly format
  private _setDisplayDate(): string {
    const iso = this.selectedDate.iso;

    const thisYear = moment().format('YYYY');
    const selectedYear = moment(iso).format('YYYY');

    let dateString = `${this._translate.instant(moment(iso).format('dddd'))} ${moment(iso).format('D')}`;
    dateString += ` ${this._translate.instant(moment(iso).format('MMMM')).toLowerCase()}`;

    if (thisYear !== selectedYear) {
      dateString += ` ${this._translate.instant(moment(iso).format('YYYY'))}`;
    }

    return dateString;
  }

  private _createDateRange(start: any, end: any): any[] {
    const range = moment.range(start, end);
    const dates = Array.from(range.by('day'));

    const dateRange = dates.map((date: any) => ({
      date: date.format('D'),
      fullDate: date.format('YYYY-MM-DD'),
      iso: date.toISOString()
    }));

    const firstDayOfMonth = moment(dates[0]).isoWeekday();
    if (firstDayOfMonth !== 1) {
      for (let i = 1; i < firstDayOfMonth; i++) {
        const date = moment(dates[0]).subtract(i, 'days');

        dateRange.unshift({
          date: date.format('D'),
          fullDate: date.format('YYYY-MM-DD'),
          iso: date.toISOString()
        });
      }
    }

    return dateRange;
  }

  private _generateHourOptions(): any[] {
    const hours = [];

    for (let i = 0; i <= 23; i++) {
      hours.push({ hour: (i < 10) ? `0${i}` : i.toString(), minutes: '00' });
      hours.push({ hour: (i < 10) ? `0${i}` : i.toString(), minutes: '30' });
    }

    return hours;
  }

  private _generateYearOptions(): string[] {
    const years = [];
    const end = moment().format('YYYY');

    for (let i = 1900; i <= end; i++) {
      years.push(i);
    }

    return years.reverse();
  }

  private _updateSelectedDate(date: any): any {
    return {
      date: date.format('D'),
      fullDate: date.format('YYYY-MM-DD'),
      iso: date.toISOString()
    };
  }
}
