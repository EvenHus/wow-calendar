import {NgModule} from '@angular/core';
import {HomeComponent} from './home.component';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {MountsModule} from "../mounts/mounts.module";
import {ProgressionModule} from "../progression/progression.module";

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    RouterModule.forChild([{path: '', component: HomeComponent}]),
    FormsModule,
    CommonModule,
    MountsModule,
    ProgressionModule
  ]
})

export class HomeModule {}
