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
    console.log(this.isLoggedIn);
  }

  checkAuth(args: boolean) {
    console.log(args);
    if (args) {
      this.isLoggedIn = args;
      this._router.navigate(['home']);
    } else {
      this.isLoggedIn = args;
    }
  }
}
