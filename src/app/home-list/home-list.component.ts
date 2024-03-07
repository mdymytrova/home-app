import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  Signal,
  inject,
} from '@angular/core';
import { AsyncPipe } from '@angular/common';

import { HouseComponent } from '../house/house.component';
import { HouseModel } from '../models/house.model';
import { HouseListService } from '../services/house-list.service';
import { SearchboxComponent } from '../searchbox/searchbox.component';

@Component({
  selector: 'app-home-list',
  standalone: true,
  imports: [HouseComponent, AsyncPipe, SearchboxComponent],
  templateUrl: './home-list.component.html',
  styleUrl: './home-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeListComponent implements OnInit, OnDestroy {
  public houseList!: Signal<HouseModel[]>;

  private houseListService = inject(HouseListService);

  public ngOnInit(): void {
    this.houseList = this.houseListService.houseList;
  }

  public onSearch(search: string): void {
    this.houseListService.setSearch(search);
  }

  public ngOnDestroy(): void {
    this.houseListService.setSearch('');
  }
}
