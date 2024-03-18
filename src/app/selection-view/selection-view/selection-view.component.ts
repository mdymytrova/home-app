import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';

import { SelectComponent } from '@common/select/select.component';
import { SelectOptionModel } from '@common/select/select-option.model';
import { HouseViewOptions } from '@constants/house-view-options.const';
import { HouseViewEnum } from '@enums/house-view.enum';
@Component({
  selector: 'app-selection-view',
  standalone: true,
  imports: [SelectComponent, MatButtonModule, RouterOutlet],
  templateUrl: './selection-view.component.html',
  styleUrl: './selection-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectionViewComponent {
  public houseViewOptions = HouseViewOptions;
  public houseViewEnum = HouseViewEnum;

  public router = inject(Router);
  public routerUrl = signal(this.router.url);

  public selectedOptionId = computed(() => {
    const url = this.routerUrl();
    const selectedOption = this.houseViewOptions.find(option =>
      url.includes(option.name.toLowerCase())
    );
    return selectedOption?.id || this.houseViewOptions[0].id;
  });

  public onViewSelect(option: SelectOptionModel<HouseViewEnum>): void {
    this.router.navigate(['all', option.name.toLowerCase()]);
  }

  public onHouseAdd(): void {
    this.router.navigate(['houses', 'new']);
  }
}
