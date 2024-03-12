import { Routes } from '@angular/router';
import { HouseListComponent } from './house-list/house-list.component';

export const routes: Routes = [
  {
    path: '',
    component: HouseListComponent,
    title: 'Houses',
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
