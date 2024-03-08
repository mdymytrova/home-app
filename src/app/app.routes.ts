import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'houses',
    loadChildren: () => import('./houses/houses.routes').then(r => r.routes),
    title: 'Houses',
  },
  {
    path: 'cities',
    loadChildren: () => import('./cities/cities.routes').then(r => r.routes),
    title: 'Cities',
  },
  {
    path: '**',
    redirectTo: 'houses',
    pathMatch: 'full',
  },
  {
    path: '',
    redirectTo: 'houses',
    pathMatch: 'full',
  },
];
