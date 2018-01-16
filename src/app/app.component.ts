import {Component, Input, OnChanges} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnChanges {
  isLoggedIn: boolean;

  constructor(private _router: Router) {
  }

  ngOnChanges() {
  }

  checkAuth(args: any) {
    if (args) {
      this.isLoggedIn = args.valid;
      this._router.navigate(['home', args.user]);
    } else {
      this.isLoggedIn = args;
    }
  }
}
