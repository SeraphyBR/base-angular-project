import { Routes } from '@angular/router';
import BasePageComponent from './pages/base.component';
import HomePageComponent from './pages/home.component';
import LoginPageComponent from './pages/login.component';
import { isLoggedGuard } from './services/auth.service';

export const routes: Routes = [
  {
    path: '',
    component: BasePageComponent,
    children: [
      { path: 'login', component: LoginPageComponent },
      { path: 'home', component: HomePageComponent, canActivate: [isLoggedGuard] },
      { path: '**', redirectTo: '/home', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

export default routes;
