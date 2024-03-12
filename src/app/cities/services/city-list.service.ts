import { Injectable, Signal, computed, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';

import { switchMap } from 'rxjs';

import { CityGateway } from '@cities/services/city.gateway';
import { CityModel } from '@cities/models/city.model';
import { CityFilterModel } from '@cities/models/city-filter.model';

@Injectable({
  providedIn: 'root',
})
export class CityListService {
  private cityGateway = inject(CityGateway);
  private searchSignal = signal<string>('');
  private includeWithoutHousesSignal = signal<boolean>(false);
  private filterSignal = computed<CityFilterModel>(() => {
    const search = this.searchSignal();
    const includeWithoutHouses = this.includeWithoutHousesSignal();
    return {
      search,
      includeWithoutHouses,
    };
  });

  private cityList$ = toObservable(this.filterSignal).pipe(
    switchMap((filter: CityFilterModel) => this.cityGateway.getCities(filter))
  );

  public cityList: Signal<CityModel[]> = toSignal(this.cityList$, {
    initialValue: [],
  });

  public includeWithoutHouses = this.includeWithoutHousesSignal.asReadonly();

  public setSearch(search: string): void {
    this.searchSignal.set(search);
  }

  public resetFilter(): void {
    this.searchSignal.set('');
    this.includeWithoutHousesSignal.set(false);
  }

  public setIncludeWithoutHouses(): void {
    this.includeWithoutHousesSignal.set(!this.includeWithoutHousesSignal());
  }
}
