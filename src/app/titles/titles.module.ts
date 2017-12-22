import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {TitelsComponent} from './titels.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    TitelsComponent
  ],
  exports: [
    TitelsComponent
  ]
})

export class TitlesModule {}
