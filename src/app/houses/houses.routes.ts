import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'new',
    loadComponent: () =>
      import('./add-house/add-house.component').then(m => m.AddHouseComponent),
    title: 'Add House',
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
