import {NgModule} from '@angular/core';
import {ApiService} from './api.service';
import {AuthService} from './auth.service';
import {EventService} from './event.service';
import {HelperService} from './helper.service';

@NgModule({
  providers: [
    ApiService,
    AuthService,
    EventService,
    HelperService
  ]
})

export class CoreModule {}
