import { Component, OnInit, Signal, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';

import { HouseComponent } from '../house/house.component';
import { HouseModel } from '../models/house.model';
import { HouseListService } from '../services/house-list.service';

@Component({
  selector: 'app-home-list',
  standalone: true,
  imports: [HouseComponent, AsyncPipe],
  templateUrl: './home-list.component.html',
  styleUrl: './home-list.component.scss',
})
export class HomeListComponent implements OnInit {
  public houseList!: Signal<HouseModel[]>;

  private houseListService = inject(HouseListService);

  public ngOnInit(): void {
    this.houseList = this.houseListService.houseList;
  }
}
