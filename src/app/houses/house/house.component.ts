import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { HouseModel } from '@houses/models/house.model';

@Component({
  selector: 'app-house',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './house.component.html',
  styleUrl: './house.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HouseComponent {
  @Input() house!: HouseModel;
}