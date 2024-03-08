import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  effect,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';

import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-searchbox',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './searchbox.component.html',
  styleUrl: './searchbox.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchboxComponent {
  @Output() public searchChange = new EventEmitter();
  public searchControl = new FormControl<string | null>(null);

  private searchSignal = toSignal(
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ),
    { initialValue: null }
  );

  constructor() {
    effect(
      () => {
        const search = this.searchSignal();
        if (typeof search === 'string') {
          this.searchChange.emit(search.trim().toLowerCase());
        }
      },
      { allowSignalWrites: true }
    );
  }

  public onClear(): void {
    this.searchControl.setValue('');
  }
}
