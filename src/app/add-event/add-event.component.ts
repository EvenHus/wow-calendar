import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import moment = require('moment');

@Component({
  moduleId: module.id,
  selector: 'app-add-event',
  templateUrl: './add-event.component.html'
})

export class AddEventComponent implements OnInit {
  @ViewChild('eventForm') eventForm;
  toggleViewer: boolean = true;
  title: string;
  start: any;
  end: any;
  color: string;
  draggable: boolean;
  resizable: {beforestart: boolean, afterEnd: boolean };
  colors: any = {
    red: '#ad2121',
    blue: '#1e90ff',
    yellow: '#e3bc08'
  };

  validTime: boolean;

  constructor() {
  }

  ngOnInit(): void {
    this.start = moment();
    this.end = moment().add(0.5, 'hour');
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event): void {
    if (this.toggleViewer && event.target.id === 'blackzone') {
      if (event.target.id !== 'addButton') {
        this.toggleAddNew();
      }
    }
  }

  onStartDateChanged(args: any): void {
    console.log(args);
    this._prepareEvent();
  }

  onEndDateChanged(args: any): void {
    console.log(args);
    this._prepareEvent();
  }

  toggleAddNew(): void {
    this.toggleViewer = !this.toggleViewer;
  }

  setColor(color: string) {
    console.log(color);
  }

  private _prepareEvent(): void {
    this.validTime = this._validateStartEndDate();
  }

  private _validateStartEndDate(): boolean {
    if (this.start && this.end) {
      if (this.start.isBefore(this.end)) {
        const start = moment(this.start);
        const end = moment(this.end);
        return start.isBefore(end);
      } else {
        return true;
      }
    }
  }
}
