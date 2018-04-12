import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';

@Pipe({ name: 'datepipe' })
export class Customdatepipe implements PipeTransform{
  transform(date: any): any {
    const today = moment().startOf('day');
    if (moment(date).isBefore(today)) {
      return moment(date).format('lll');
    } else {
      return moment(date).format('LT');
    }
  }
}
