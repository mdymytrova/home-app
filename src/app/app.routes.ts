import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'houses',
    loadChildren: () => import('./houses/houses.routes').then(r => r.routes),
  },
  {
    path: 'cities',
    loadChildren: () => import('./cities/cities.routes').then(r => r.routes),
  },
  {
    path: 'states',
    loadChildren: () => import('./states/states.routes').then(r => r.routes),
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
