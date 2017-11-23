import {NgModule} from '@angular/core';
import {LoginComponent} from './login.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    FormsModule
  ],
  exports: [
    LoginComponent
  ]
})

export class LoginModule {}
