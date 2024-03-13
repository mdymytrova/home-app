import { Routes } from '@angular/router';

import { CityListComponent } from './city-list/city-list.component';

export const routes: Routes = [
  {
    path: '',
    component: CityListComponent,
    title: 'Cities',
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./city-details/city-details.component').then(
        m => m.CityDetailsComponent
      ),
    title: 'City Details',
  },
];
