import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { RouterModule} from '@angular/router';
import {Route} from '@angular/router';

import {NavComponent} from './nav.component';

export const navRoute: Route[] = [
  { path: '', component: NavComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(navRoute)
  ],
  declarations: [
    NavComponent
  ],
  exports: [
    NavComponent
  ]

})

export class NavModule {}
