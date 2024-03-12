import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Signal,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';

import { CityModel } from '@cities/models/city.model';
import { CityListService } from '@cities/services/city-list.service';
import { CardComponent } from '@common/card/card.component';
import { GridViewComponent } from '@common/grid-view/grid-view.component';
import { SearchboxComponent } from '@common/searchbox/searchbox.component';

@Component({
  selector: 'app-city-list',
  standalone: true,
  imports: [SearchboxComponent, CardComponent, GridViewComponent],
  templateUrl: './city-list.component.html',
  styleUrl: './city-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityListComponent implements OnInit {
  public cityList!: Signal<CityModel[]>;
  public includeWithoutHouses!: Signal<boolean>;

  private cityListService = inject(CityListService);
  private router = inject(Router);

  public ngOnInit(): void {
    this.cityListService.resetFilter();
    this.cityList = this.cityListService.cityList;
    this.includeWithoutHouses = this.cityListService.includeWithoutHouses;
  }

  public onSearch(search: string): void {
    this.cityListService.setSearch(search);
  }

  public onToggleWithoutHouses(): void {
    this.cityListService.setIncludeWithoutHouses();
  }

  public onHouseSelect(houseId: number): void {
    this.router.navigate(['houses', `${houseId}`]);
  }
}
