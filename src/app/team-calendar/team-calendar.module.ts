import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TeamCalendarComponent} from './team-calendar.component';
import {Route, RouterModule} from '@angular/router';
import {AddEventModule} from '../add-event/add-event.module';
import {DateRangeModule} from '../shared/date-range/date-range.module';


export const calendarRoute: Route[] = [
  {path: '', component: TeamCalendarComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(calendarRoute),
    AddEventModule,
    DateRangeModule
  ],
  declarations: [
    TeamCalendarComponent
  ]
})

export class TeamCalendarModule {}
