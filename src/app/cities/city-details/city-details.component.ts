import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  Signal,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

import { GridViewComponent } from '@common/grid-view/grid-view.component';
import { CardComponent } from '@common/card/card.component';
import { CityDetailsService } from '@cities/services/city-details.service';
import { CityModel } from '@cities/models/city.model';
import { HouseModel } from '@houses/models/house.model';

@Component({
  selector: 'app-city-details',
  standalone: true,
  imports: [GridViewComponent, CardComponent, MatIconModule],
  providers: [CityDetailsService],
  templateUrl: './city-details.component.html',
  styleUrl: './city-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityDetailsComponent implements OnInit {
  @Input() set id(id: string) {
    this.cityDetailsService.loadCityDetails(Number(id));
  }

  public city!: Signal<CityModel>;
  public houses!: Signal<HouseModel[]>;

  private cityDetailsService = inject(CityDetailsService);
  private router = inject(Router);

  public ngOnInit(): void {
    this.city = this.cityDetailsService.city as Signal<CityModel>;
    this.houses = this.cityDetailsService.houseList as Signal<HouseModel[]>;
  }

  public onHouseSelect(houseId: number): void {
    this.router.navigate(['houses', `${houseId}`]);
  }
}
