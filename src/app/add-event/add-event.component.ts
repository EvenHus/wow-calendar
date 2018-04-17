import {Component, EventEmitter, HostListener, OnInit, Output, ViewChild} from '@angular/core';
import moment = require('moment');

@Component({
  moduleId: module.id,
  selector: 'app-add-event',
  templateUrl: './add-event.component.html'
})

export class AddEventComponent implements OnInit {
  @ViewChild('eventForm') eventForm;
  @Output() createEvent: EventEmitter<any> = new EventEmitter<any>();
  toggleViewer: boolean;
  event: {title: string, start: any, end: any, color: string};
  draggable: boolean;
  resizable: {beforestart: boolean, afterEnd: boolean };
  validTime = true;

  constructor() {}

  ngOnInit(): void {
    this.event = {title: null, start: null, end: null, color: null};

    if (this.event && !this.event.start) {
      this.event.start = moment();
      this.event.end = moment().add(0.5, 'hour');
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event): void {
    if (this.toggleViewer && event.target.id === 'blackzone') {
      if (event.target.id !== 'addButton') {
        this.toggleAddNew();
      }
    }
  }

  onStartDateChanged(startDate: any): void {
    this.event.start = startDate;
    this._prepareEvent();
  }

  onEndDateChanged(endDate: any): void {
    this.event.end = endDate;
    this._prepareEvent();
  }

  toggleAddNew(): void {
    this.toggleViewer = !this.toggleViewer;
  }

  setColor(color: string) {
    this.event.color = color;
    this._prepareEvent();
  }

  addNewEvent(): void {
    this.createEvent.emit(this.event);
    this.toggleAddNew();
  }

  private _prepareEvent(): void {
    this.validTime = this._validateStartEndDate();
  }

  private _validateStartEndDate(): boolean {
    if (this.event.start && this.event.end) {
      const start = moment(this.event.start);
      const end = moment(this.event.end);
      return start.isBefore(end);
    } else {
      return true;
    }
  }
}
