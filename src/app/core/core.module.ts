import {NgModule} from '@angular/core';
import {ApiService} from './api.service';
import {AuthService} from './auth.service';
import {EventService} from './event.service';

@NgModule({
  providers: [
    ApiService,
    AuthService,
    EventService
  ]
})

export class CoreModule {}
