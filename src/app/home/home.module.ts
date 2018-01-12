import {NgModule} from '@angular/core';
import {HomeComponent} from './home.component';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {MountsModule} from "../mounts/mounts.module";
import {ProgressionModule} from "../progression/progression.module";
import {TitlesModule} from "../titles/titles.module";


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    RouterModule.forChild([{path: '', component: HomeComponent}]),
    FormsModule,
    CommonModule,
    MountsModule,
    ProgressionModule,
    TitlesModule
  ]
})

export class HomeModule {}
