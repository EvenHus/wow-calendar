import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {DatePickerModule} from '../shared/date-picker/date-picker.module';

import {AddEventComponent} from './add-event.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DatePickerModule
  ],
  declarations: [
    AddEventComponent
  ],
  exports: [
    AddEventComponent
  ]
})

export class AddEventModule {}
