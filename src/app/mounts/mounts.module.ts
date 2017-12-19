import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {MountsComponent} from './mounts.component';


@NgModule({
  declarations: [
    MountsComponent
  ],
  imports: [
    //RouterModule.forChild([{path: '', component: MountsComponent}]),
    FormsModule,
    CommonModule
  ],
  exports: [
    MountsComponent
  ],
  schemas: [NO_ERRORS_SCHEMA]
})

export class MountsModule {}
