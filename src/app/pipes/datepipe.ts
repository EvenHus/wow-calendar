import {Pipe} from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'datepipe'
})
export class Datepipe {
  transform(date: any) {
    const now = moment().startOf('day');
    if (moment(date).isBefore(now)) {
      return moment(date).format('lll');
    } else {
      return moment(date).format('LT');
    }
  }
}
