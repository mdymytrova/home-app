import { Routes } from '@angular/router';
import { HomeListComponent } from './home-list/home-list.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeListComponent,
    title: 'Homes',
  },
  {
    path: 'details/:id',
    loadComponent: () =>
      import('./house-details/house-details.component').then(
        m => m.HouseDetailsComponent
      ),
    title: 'House Details',
  },
  {
    path: 'add-house',
    loadChildren: () => import('./add-house.routes').then(r => r.routes),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
