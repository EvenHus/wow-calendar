import {Injectable} from '@angular/core';

@Injectable()
export class HelperService {

  isMobile(): boolean {
    return window.innerWidth <= 768;
  }
}
