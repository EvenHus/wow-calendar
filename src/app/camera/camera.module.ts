import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {CameraComponent} from './camera.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: CameraComponent}])
  ],
  declarations: [
    CameraComponent
  ]
})

export class CameraModule {}
