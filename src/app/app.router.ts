import {Route} from '@angular/router';

export const appRoutes: Route[] = [
  {path: 'login', loadChildren: './login/login.module#LoginModule'},
];
