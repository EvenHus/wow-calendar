import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AngularFireDatabase} from 'angularfire2/database';
import {Subscription} from 'rxjs/Subscription';

@Component({
  moduleId: module.id,
  selector: 'app-chat',
  templateUrl: './chat.html'
})

export class ChatComponent implements OnInit, OnDestroy {
  messages: Observable<any[]>;
  itemsRef: any;
  data: any;
  itemsSubscription: Subscription;

  constructor(private _db: AngularFireDatabase) {
  }

  ngOnInit(): void {
    this.messages = this._db.list('messages').valueChanges();
    this.itemsRef = this._db.list('messages');
  }

  send(): void {
    this.itemsRef.push({content: this.data});
    this.data = '';
  }

  ngOnDestroy(): void {
    if (this.itemsSubscription) {
      this.itemsSubscription.unsubscribe();
    }
  }
}
