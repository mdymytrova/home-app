import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'all',
    loadChildren: () =>
      import('./selection-view/selection-view.routes').then(r => r.routes),
  },
  {
    path: 'houses',
    loadChildren: () => import('./houses/houses.routes').then(r => r.routes),
  },
  {
    path: 'cities',
    loadChildren: () => import('./cities/cities.routes').then(r => r.routes),
  },
  {
    path: '**',
    redirectTo: 'all',
    pathMatch: 'full',
  },
  {
    path: '',
    redirectTo: 'all',
    pathMatch: 'full',
  },
];
