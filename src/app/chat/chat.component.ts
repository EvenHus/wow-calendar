import {Component} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-chat',
  templateUrl: './chat.html'
})

export class ChatComponent {
  constructor(){
    console.log('hello');
  }
}
