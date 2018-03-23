import {Component, OnDestroy, OnInit, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AngularFireDatabase} from 'angularfire2/database';
import {Subscription} from 'rxjs/Subscription';
import * as moment from 'moment';
import * as rootState from '../store/index';
import {Store} from '@ngrx/store';

@Component({
  moduleId: module.id,
  selector: 'app-chat',
  templateUrl: './chat.html'
})

export class ChatComponent implements OnInit, OnDestroy {
  @ViewChild('chatWindow') chatWindow: ElementRef;
  chats: Observable<any[]>;
  chatRef: any;
  message: any;
  user: string;

  itemsSubscription: Subscription;
  messageSubscription: Subscription;
  messagesSubscription: Subscription;
  loggedInUserSubscription: Subscription;

  constructor(private _db: AngularFireDatabase, private _store: Store<rootState.IAppState>) {
  }

  ngOnInit(): void {
    this.chatRef = this._db.list('chat');
    this.chats = this._db.list('chat').valueChanges();
    this.loggedInUserSubscription = this._store.select(rootState.getLoggedInUser).subscribe(user => this.user = user.username);
  }


  send(): void {
    const chat = {
      user: this.user,
      message: this.message,
      time: moment().format('LTS')
    };
    this.chatRef.push(chat);
    this.message = '';
    this._scrollToBottom();
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

  toBottom(): void {
    this._scrollToBottom();
  }

  private _scrollToBottom() {
    if (this.chatWindow) {
      setTimeout(_ => {
        try {
          this.chatWindow.nativeElement.scrollTop = this.chatWindow.nativeElement.scrollHeight;
        } catch (err) {}
      }, 0);
    }
  }
}
