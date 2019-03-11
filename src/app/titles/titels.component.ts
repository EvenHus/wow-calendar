import {Component, Input, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {ApiService} from '../core/api.service';
import {Subscription} from "rxjs/Subscription";
import {Store} from "@ngrx/store";
import * as rootState from '../store/index';
import * as DataActions from '../store/data/data.actions';

@Component({
  moduleId: module.id,
  selector: 'app-titles',
  templateUrl: './titles.component.html'
})

export class TitelsComponent implements OnChanges, OnDestroy {
  @Input() name: string;
  @Input() realm: string;

  data: any[] = [];
  tempData: any[] = [];
  titlesSubscription: Subscription;

  constructor(private _api: ApiService, private _store: Store<rootState.IAppState>) {}

  ngOnChanges(): void {
    if (this.name && this.realm) {
      this.titlesSubscription = this._store.select(rootState.getTitles).subscribe( data => {
        if (data) {
          data.titles.map(titles => {
            const title = titles.name.replace('%s', this.name);
            this.data.push(title);
          });
        }
      });
      this._store.dispatch(new DataActions.LoadTitles({name: this.name, realm: this.realm}));
    }
  }

  ngOnDestroy(): void {
    if (this.titlesSubscription) {
      this.titlesSubscription.unsubscribe();
    }
  }
}
