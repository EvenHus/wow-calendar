import {NgModule} from '@angular/core';
import {HomeComponent} from './home.component';
import {RouterModule, Route} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {MountsModule} from "../mounts/mounts.module";
import {ProgressionModule} from "../progression/progression.module";
import {TitlesModule} from "../titles/titles.module";

export const homeRoutes: Route[] = [
  {path: '', component: HomeComponent},
  {path: ':user', component: HomeComponent}
];

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    RouterModule.forChild(homeRoutes),
    FormsModule,
    CommonModule,
    MountsModule,
    ProgressionModule,
    TitlesModule
  ]
})

export class HomeModule {}
