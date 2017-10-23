import {NgModule} from '@angular/core';
import {LoginComponent} from './login.component';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    RouterModule.forChild([{path: '', component: LoginComponent}]),
  ]
})

export class LoginModule {}
