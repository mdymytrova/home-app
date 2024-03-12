import {
  ChangeDetectionStrategy,
  Component,
  Input,
  TemplateRef,
  input,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

import { CardComponent } from '@common/card/card.component';

@Component({
  selector: 'app-grid-view',
  standalone: true,
  imports: [CardComponent, NgTemplateOutlet],
  templateUrl: './grid-view.component.html',
  styleUrl: './grid-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridViewComponent<T extends { [key: string]: unknown }> {
  public data = input.required<T[]>();
  @Input() dataItemTemplate!: TemplateRef<unknown>;
  @Input() trackBy = 'id';
}
