import {Component, OnDestroy, OnInit, ViewChild, ElementRef, AfterViewInit, OnChanges} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AngularFireDatabase} from 'angularfire2/database';
import {Subscription} from 'rxjs/Subscription';
import * as moment from 'moment';
import * as rootState from '../store/index';
import {Store} from '@ngrx/store';

@Component({
  moduleId: module.id,
  selector: 'app-chat',
  templateUrl: './chat.component.html'
})

export class ChatComponent implements OnInit, OnDestroy {
  @ViewChild('chatWindow') chatWindow: ElementRef;
  chats: Observable<any[]>;
  chatRef: any;
  message: any;
  color: string;

  user: string;

  loggedInUserSubscription: Subscription;
  chatSubscription: Subscription;

  constructor(private _db: AngularFireDatabase, private _store: Store<rootState.IAppState>) {
  }

  ngOnInit(): void {
    this.loggedInUserSubscription = this._store.select(rootState.getLoggedInUser).subscribe(user => {
      if (user) {
        this.user = user.username;
        this.chatRef = this._db.list('chat');
        this.chats = this._db.list('chat').valueChanges();
        this.chatSubscription = this.chats.subscribe(data => this._scrollToBottom());
      }
    });
  }

  send(): void {
    const chat = {
      user: this.user,
      message: this.message,
      time: moment().format()
    };
    this.chatRef.push(chat);
    this.message = '';
  }

  ngOnDestroy(): void {
    if ( this.chatSubscription) {
      this.chatSubscription.unsubscribe();
    }
    if (this.loggedInUserSubscription) {
      this.loggedInUserSubscription.unsubscribe();
    }
  }

  private _scrollToBottom() {
    if (this.chatWindow) {
      setTimeout(_ => {
        try {
          this.chatWindow.nativeElement.scrollTop = this.chatWindow.nativeElement.scrollHeight;
        } catch (err) {
        }
      }, 0);
    }
  }
}
