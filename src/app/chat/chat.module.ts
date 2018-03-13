import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ChatComponent} from './chat.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: ChatComponent}]),
    FormsModule
  ],
  declarations: [
    ChatComponent
  ]
})

export class ChatModule {}
