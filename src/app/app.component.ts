import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'WoW Calendar';
  isLoggedIn = false;

  constructor(private _router: Router) {
  }

  ngOnInit() {
  }

  checkLogin(): void {
    if (this.isLoggedIn) {
      console.log('You are logged in');
    } else {
      console.log('hello');
      this._router.navigate(['login']);
    }
  }
}
