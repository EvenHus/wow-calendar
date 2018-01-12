import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {StoreModule} from '@ngrx/store';

import { AppComponent } from './app.component';
import {appRoutes} from './app.router';
import {LoginModule} from './login/login.module';
import {CoreModule} from './core/core.module';
import {NavModule} from './nav/nav.module';
import {metaReducers, reducers} from './store';
import {EffectsModule} from '@ngrx/effects';

import {DataEffects} from './store/data/data.effects';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    LoginModule,
    CoreModule,
    CommonModule,
    HttpClientModule,
    NavModule,
    StoreModule.forRoot(reducers, {metaReducers}),
    EffectsModule.forRoot([
      DataEffects
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
