import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { NewApplication } from './pages/new-application/new-application';
import { ApplicationList } from './pages/application-list/application-list';
import { Register } from './pages/register/register';

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
  },
  {
    path: 'application-list',
    component: ApplicationList,
  },
  {
    path: 'register',
    component: Register,
  },
];
