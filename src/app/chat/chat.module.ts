import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ChatComponent} from './chat.component';
import {FormsModule} from '@angular/forms';
import {Customdatepipe} from '../pipes/customdatepipe';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: ChatComponent}]),
    FormsModule
  ],
  declarations: [
    ChatComponent,
    Customdatepipe
  ]
})

export class ChatModule {}
