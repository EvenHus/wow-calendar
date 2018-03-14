import {Component, OnDestroy, OnInit, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AngularFireDatabase} from 'angularfire2/database';
import {Subscription} from 'rxjs/Subscription';
import * as moment from 'moment';

@Component({
  moduleId: module.id,
  selector: 'app-chat',
  templateUrl: './chat.html'
})

export class ChatComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('chatWindow') chatWindow: ElementRef;
  chats: Observable<any[]>;
  chatRef: any;
  message: any;

  user: string;
  toggle: boolean;

  itemsSubscription: Subscription;
  messageSubscription: Subscription;
  messagesSubscription: Subscription;

  constructor(private _db: AngularFireDatabase) {
  }

  ngOnInit(): void {
    this.chatRef = this._db.list('chat');
    this.chats = this._db.list('chat').valueChanges();

    this.messageSubscription = this.chats.subscribe(message => {
      message.map(data => {
        });
    });
  }

  ngAfterViewInit(): void {
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    try {
      console.log(this.chatWindow);
      this.chatWindow.nativeElement.scrollTop = this.chatWindow.nativeElement.scrollHeight + 10000;
    } catch (err) {}
  }

  send(): void {
    const chat = {
      user: this.user,
      message: this.message,
      time: moment().format('LTS')
    };
    this.chatRef.push(chat);
    this.message = '';
    this.scrollToBottom();
  }

  enterChat(): void {
    if (!this.toggle) {
      this.toggle = true;
    } else {
      this.toggle = false;
    }
  }

  ngOnDestroy(): void {
    if (this.itemsSubscription) {
      this.itemsSubscription.unsubscribe();
    }
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
    if (this.messagesSubscription) {
      this.messagesSubscription.unsubscribe();
    }
  }

}
