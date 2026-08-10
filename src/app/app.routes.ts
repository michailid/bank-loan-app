import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { NewApplication } from './pages/new-application/new-application';
import { ApplicationList } from './pages/application-list/application-list';
import { Register } from './pages/register/register';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: Home,
  },
  {
    path: 'new-form',
    component: NewApplication,
    canActivate: [authGuard],
  },
  {
    path: 'application-list',
    component: ApplicationList,
    canActivate: [authGuard],
  },
  {
    path: 'register',
    component: Register,
  },
];
