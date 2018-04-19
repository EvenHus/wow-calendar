import {Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ApiService} from '../core/api.service';
import * as rootState from '../store/index';
import * as DataActions from '../store/data/data.actions';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';

@Component({
  moduleId: module.id,
  selector: 'app-mounts',
  templateUrl: './mounts.component.html'
})

export class MountsComponent implements OnDestroy, OnChanges {
  @ViewChild('mountImage') mountImage: ElementRef;
  @ViewChild('mountListItem') mountListItem: ElementRef;
  @Input() realm: string;
  @Input() name: string;
  showImage: boolean;
  image: any;
  data: any [] = [];
  loading$: Observable<boolean>;
  buttonTitle:  string = 'Show Images';
  mountSubscription: Subscription;


  constructor(private _api: ApiService, private _store: Store<rootState.IAppState>) {
    this.loading$ = this._store.select(rootState.getDataLoadingState);
  }

  ngOnChanges(): void {
    if (this.realm && this.name) {
      this.mountSubscription = this._store.select(rootState.getMounts).subscribe(data => {
        if (data) {
          this.data = data.mounts.collected;
        }
      });
      this._store.dispatch(new DataActions.LoadMounts({name: this.name, realm: this.realm}));
    }
  }

  toggleImage(id: number): void {
    this.showImage = !this.showImage;
    if (this.showImage) {
      this.buttonTitle = 'Hide Images';
    }
    if (!this.showImage) {
      this.buttonTitle = 'Show Images';
    }

    //this.image = 'http://media.blizzard.com/wow/renders/npcs/zoom/creature' + id + '.jpg';

  }

  ngOnDestroy(): void {
    if (this.mountSubscription) {
      this.mountSubscription.unsubscribe();
    }
  }


}
