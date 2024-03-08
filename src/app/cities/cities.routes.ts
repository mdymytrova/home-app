import { Routes } from '@angular/router';

import { CityListComponent } from './city-list/city-list.component';

export const routes: Routes = [
  {
    path: '',
    component: CityListComponent,
    title: 'Cities',
  },
];
