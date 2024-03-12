import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  Signal,
  inject,
} from '@angular/core';
import { AsyncPipe } from '@angular/common';

import { HouseComponent } from '@houses/house/house.component';
import { HouseModel } from '@houses/models/house.model';
import { HouseListService } from '@houses/services/house-list.service';
import { SearchboxComponent } from '@common/searchbox/searchbox.component';

@Component({
  selector: 'app-house-list',
  standalone: true,
  imports: [HouseComponent, AsyncPipe, SearchboxComponent],
  templateUrl: './house-list.component.html',
  styleUrl: './house-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HouseListComponent implements OnInit, OnDestroy {
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
