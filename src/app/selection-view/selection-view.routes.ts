import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./selection-view/selection-view.component').then(
        m => m.SelectionViewComponent
      ),
    children: [
      {
        path: '',
        redirectTo: 'houses',
        pathMatch: 'full',
      },
      {
        path: 'houses',
        loadComponent: () =>
          import('./house-list/house-list.component').then(
            m => m.HouseListComponent
          ),
      },
      {
        path: 'cities',
        loadComponent: () =>
          import('./city-list/city-list.component').then(
            m => m.CityListComponent
          ),
      },
      {
        path: 'states',
        loadComponent: () =>
          import('./state-list/state-list.component').then(
            m => m.StateListComponent
          ),
      },
    ],
  },
];
