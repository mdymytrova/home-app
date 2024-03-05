import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { HomeListComponent } from './home-list/home-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, HomeListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
