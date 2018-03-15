import {NgModule} from '@angular/core';
import {ApiService} from './api.service';
import {AuthService} from './auth.service';

@NgModule({
  providers: [
    ApiService,
    AuthService
  ]
})

export class CoreModule {}
