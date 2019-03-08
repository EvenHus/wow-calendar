import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {Ng2Webstorage} from 'ngx-webstorage';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {StoreModule} from '@ngrx/store';
import { AppComponent } from './app.component';
import {appRoutes} from './app.router';
import {LoginModule} from './login/login.module';
import {CoreModule} from './core/core.module';
import {NavModule} from './nav/nav.module';
import {metaReducers, reducers} from './store';
import {EffectsModule} from '@ngrx/effects';

import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { MessagingService} from './core/messaging.service';
import { environment } from '../environments/environment';
import { AsyncPipe} from '@angular/common';

import {DataEffects} from './store/data/data.effects';
import {AuthEffects} from './store/auth/auth.effects';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {EventEffects} from './store/event/event.effects';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    LoginModule,
    CoreModule,
    CommonModule,
    HttpClientModule,
    NavModule,
    StoreModule.forRoot(reducers, {metaReducers}),
    EffectsModule.forRoot([
      DataEffects,
      AuthEffects,
      EventEffects
    ]),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    Ng2Webstorage,
  ],
  providers: [MessagingService, AsyncPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
