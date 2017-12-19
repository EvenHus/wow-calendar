import {Component, EventEmitter, Output, ViewChild} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: './login.component.html'
})

export class LoginComponent {
  @ViewChild('loginForm') loginForm;
  @Output() authenticated: EventEmitter<boolean> = new EventEmitter();
  name: string = null;

  constructor() {
  }

  login(): void {
    if (this.name === 'even') {
      this.authenticated.emit(true);
    } else {
      alert('Login failed');
    }
  }

}
