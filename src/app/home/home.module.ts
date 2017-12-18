import {NgModule} from '@angular/core';
import {HomeComponent} from './home.component';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    RouterModule.forChild([{path: '', component: HomeComponent}]),
    FormsModule,
    CommonModule
  ]
})

export class HomeModule {}
