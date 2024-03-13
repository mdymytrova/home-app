import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./house-list/house-list.component').then(
        m => m.HouseListComponent
      ),
    title: 'Houses',
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./add-house/add-house.component').then(m => m.AddHouseComponent),
    title: 'House Details',
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./house-details/house-details.component').then(
        m => m.HouseDetailsComponent
      ),
    title: 'House Details',
  },
];
