import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TeamCalendarComponent} from './team-calendar.component';
import {Route, RouterModule} from '@angular/router';
import {CalendarModule} from 'angular-calendar';
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {AddEventModule} from '../add-event/add-event.module';


export const calendarRoute: Route[] = [
  {path: '', component: TeamCalendarComponent}
];

@NgModule({
  imports: [
    CommonModule,
    CalendarModule.forRoot(),
    RouterModule.forChild(calendarRoute),
    NgbModalModule.forRoot(),
    AddEventModule
  ],
  declarations: [
    TeamCalendarComponent
  ]
})

export class TeamCalendarModule {}
