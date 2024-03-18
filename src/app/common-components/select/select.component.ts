import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  computed,
  effect,
  input,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

import { SelectOptionModel } from './select-option.model';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [ReactiveFormsModule, MatSelectModule],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent<T> {
  @Input() public label = '';
  @Output() public optionSelect = new EventEmitter<SelectOptionModel<T>>();
  public options = input.required<SelectOptionModel<T>[]>();
  public selectedOptionId = input<T>();

  public selectedOptionIdSignal = computed(() => {
    return this.selectedOptionId() || this.options()[0]?.id;
  });

  public optionControl = new FormControl({} as SelectOptionModel<T>, {
    nonNullable: true,
  });

  private optionChangesSignal = toSignal(this.optionControl.valueChanges);

  constructor() {
    effect(() => {
      const selectedId = this.selectedOptionIdSignal();
      console.log('Effect from selectedId: ', selectedId);

      this.optionControl.setValue(this.getSelectedOption(selectedId), {
        emitEvent: false,
      });
    });

    effect(() => {
      const currentOption = this.optionChangesSignal();
      if (currentOption) {
        this.optionSelect.emit(currentOption);
      }
    });
  }

  private getSelectedOption(id: T): SelectOptionModel<T> {
    return this.options().find(
      option => option.id === id
    ) as SelectOptionModel<T>;
  }
}
