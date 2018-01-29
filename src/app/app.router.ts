import {Route} from '@angular/router';

export const appRoutes: Route[] = [
  {path: 'home', loadChildren: './home/home.module#HomeModule'},
  {path: 'camera', loadChildren: './camera/camera.module#CameraModule'}
];
