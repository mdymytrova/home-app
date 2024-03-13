import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Signal,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';

import { HouseModel } from '@houses/models/house.model';
import { HouseListService } from '@houses/services/house-list.service';
import { SearchboxComponent } from '@common/searchbox/searchbox.component';
import { CardComponent } from '@common/card/card.component';
import { GridViewComponent } from '@common/grid-view/grid-view.component';

@Component({
  selector: 'app-house-list',
  standalone: true,
  imports: [SearchboxComponent, CardComponent, GridViewComponent],
  providers: [HouseListService],
  templateUrl: './house-list.component.html',
  styleUrl: './house-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HouseListComponent implements OnInit {
  public houseList!: Signal<HouseModel[]>;

  private houseListService = inject(HouseListService);
  private router = inject(Router);

  public ngOnInit(): void {
    this.houseList = this.houseListService.houseList;
  }

  public onSearch(search: string): void {
    this.houseListService.setSearch(search);
  }

  public onHouseSelect(houseId: number): void {
    this.router.navigate(['houses', `${houseId}`]);
  }
}
