import {Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ApiService} from '../core/api.service';
import * as rootState from '../store/index';
import * as DataActions from '../store/data/data.actions';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {HelperService} from '../core/helper.service';

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
  showAllImages: boolean;
  image: any;
  data: any [] = [];
  loading$: Observable<boolean>;
  buttonTitle:  string = 'Show all images';
  isMobile: boolean;
  creatureId: number;
  mountSubscription: Subscription;


  constructor(private _api: ApiService, private _store: Store<rootState.IAppState>, private _helper: HelperService) {
    this.loading$ = this._store.select(rootState.getDataLoadingState);
    this.isMobile = _helper.isMobile();
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
    this.creatureId = id;
    this.showImage = !this.showImage;
  }

  toggleAllImages(): void {
    this.showAllImages = !this.showAllImages;
    if (this.showAllImages) {
      this.buttonTitle = 'Hide all images';
    }
    if (!this.showAllImages) {
      this.buttonTitle = 'Show all images';
    }
  }

  ngOnDestroy(): void {
    if (this.mountSubscription) {
      this.mountSubscription.unsubscribe();
    }
  }


}
