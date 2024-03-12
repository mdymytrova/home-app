import { Routes } from '@angular/router';

import { StateListComponent } from './state-list/state-list.component';

export const routes: Routes = [
  {
    path: '',
    component: StateListComponent,
    title: 'States',
  },
];
