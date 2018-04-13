import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {DatePickerComponent} from './date-picker.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    DatePickerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule.forChild()
  ],
  exports: [
    DatePickerComponent
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class DatePickerModule {}
