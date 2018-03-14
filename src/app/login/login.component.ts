import {Component, EventEmitter, Output, ViewChild} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: './login.component.html'
})

export class LoginComponent {
  @ViewChild('loginForm') loginForm;
  @Output() authenticated: EventEmitter<any> = new EventEmitter();
  password: string;
  name: string;
  realm: string;

  constructor() {

  }

  login(): void {
    if (this.password === 'even') {
      const send = {valid: true, user: this.name, realm: this.realm};
      this.authenticated.emit(send);
    } else {
      alert('Login failed');
    }
  }

}
