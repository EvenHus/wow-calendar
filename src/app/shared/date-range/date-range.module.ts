import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {DateRangeComponent} from './date-range.component';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule
  ],
  declarations: [
    DateRangeComponent
  ],
  exports: [
    DateRangeComponent
  ],
  schemas: [NO_ERRORS_SCHEMA]
})

export class DateRangeModule {}
