import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Signal,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { CityModel } from '@cities/models/city.model';
import { CityListService } from '@cities/services/city-list.service';
import { CardComponent } from '@common/card/card.component';
import { GridViewComponent } from '@common/grid-view/grid-view.component';
import { SearchboxComponent } from '@common/searchbox/searchbox.component';
import { HouseSearchPlaceholder } from '@constants/house-search-placeholder.const';
import { HouseViewEnum } from '@enums/house-view.enum';

@Component({
  selector: 'app-city-list',
  standalone: true,
  imports: [
    SearchboxComponent,
    CardComponent,
    GridViewComponent,
    MatCheckboxModule,
  ],
  providers: [CityListService],
  templateUrl: './city-list.component.html',
  styleUrl: './city-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityListComponent implements OnInit {
  public placeholder = HouseSearchPlaceholder[HouseViewEnum.City];
  public cityList!: Signal<CityModel[]>;
  public includeWithoutHouses!: Signal<boolean>;

  private cityListService = inject(CityListService);
  private router = inject(Router);

  public ngOnInit(): void {
    this.cityList = this.cityListService.cityList;
    this.includeWithoutHouses = this.cityListService.includeWithoutHouses;
  }

  public onSearch(search: string): void {
    this.cityListService.setSearch(search);
  }

  public onToggleWithoutHouses(): void {
    this.cityListService.setIncludeWithoutHouses();
  }

  public onCitySelect(cityId: number): void {
    this.router.navigate(['cities', `${cityId}`]);
  }
}
