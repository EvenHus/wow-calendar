import {Component, OnDestroy, OnInit, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AngularFireDatabase} from 'angularfire2/database';
import {Subscription} from 'rxjs/Subscription';
import * as moment from 'moment';
import {now} from 'moment';

@Component({
  moduleId: module.id,
  selector: 'app-chat',
  templateUrl: './chat.component.html'
})

export class ChatComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('chatWindow') chatWindow: ElementRef;
  chats: Observable<any[]>;
  chatRef: any;
  message: any;

  user: string = 'salasade';
  toggle: boolean = true;

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
    this._scrollToBottom();
  }

  ngAfterViewInit(): void {
    this._scrollToBottom();
  }

  send(): void {
    const chat = {
      user: this.user,
      message: this.message,
      time: moment().format()
    };
    this.chatRef.push(chat);
    this.message = '';
    setTimeout(_ => {
      this._scrollToBottom();
    }, 0);
  }

  enterChat(): void {
    if (!this.toggle) {
      this.toggle = true;
      setTimeout(_ => {
        this._scrollToBottom();
      }, 0);
    } else {
      this.toggle = false;
    }
  }

  setTime(time: any) {
    const now = moment().startOf('day');
    if (moment(time).isBefore(now)) {
      return moment(time).format('lll');
    } else {
      return moment(time).format('LT');
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

  private _scrollToBottom() {
    if (this.chatWindow) {
      try {
        this.chatWindow.nativeElement.scrollTop = this.chatWindow.nativeElement.scrollHeight;
      } catch (err) {}
    }
  }
}
