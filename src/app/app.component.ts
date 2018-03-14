import {Component, OnChanges} from '@angular/core';
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
      this._router.navigate(['home', args.user, args.realm]);
    } else {
      this.isLoggedIn = args;
    }
  }
}
