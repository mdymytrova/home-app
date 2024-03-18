import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: ':id',
    loadComponent: () =>
      import('./city-details/city-details.component').then(
        m => m.CityDetailsComponent
      ),
    title: 'City Details',
  },
];
