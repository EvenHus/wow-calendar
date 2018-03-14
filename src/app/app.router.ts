import {Route} from '@angular/router';

export const appRoutes: Route[] = [
  {path: '', loadChildren: './home/home.module#HomeModule'},
  {path: 'home', loadChildren: './home/home.module#HomeModule'},
  {path: 'chat', loadChildren: './chat/chat.module#ChatModule'},
  {path: 'team-calendar', loadChildren: './team-calendar/team-calendar.module#TeamCalendarModule'}
];
