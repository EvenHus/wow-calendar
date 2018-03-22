import {NgModule} from '@angular/core';
import {LoginComponent} from './login.component';
import {CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import {Route, RouterModule} from '@angular/router';

export const loginRoute: Route[] = [
  {path: '', component: LoginComponent}
];

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    FormsModule,
    RouterModule.forChild(loginRoute),
    CommonModule
  ],
  exports: [
    LoginComponent
  ]
})

export class LoginModule {}
