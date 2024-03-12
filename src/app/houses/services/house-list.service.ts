import { Injectable, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';

import { Observable, map, of, switchMap, tap } from 'rxjs';

import { HouseModel } from '@houses/models/house.model';
import { HouseGateway } from '@houses/services/house.gateway';

@Injectable({
  providedIn: 'root',
})
export class HouseListService {
  private houseGateway = inject(HouseGateway);
  private searchSignal = signal<string>('');

  private savedHouseList = signal([] as HouseModel[]);
  private houseList$ = toObservable(this.searchSignal).pipe(
    switchMap((search: string) =>
      this.getHouseList().pipe(
        map(houses => this.getFilteredHouseList(houses, search))
      )
    )
  );

  public houseList = toSignal(this.houseList$, { initialValue: [] });

  public setSearch(search: string): void {
    this.searchSignal.set(search);
  }

  private getFilteredHouseList(
    houses: HouseModel[],
    search: string
  ): HouseModel[] {
    return !search
      ? houses
      : houses.filter(house => {
          return (
            house.cityName.trim().toLowerCase().includes(search) ||
            house.stateName.trim().toLowerCase().includes(search) ||
            house.name.trim().toLowerCase().includes(search)
          );
        });
  }

  private getHouseList(): Observable<HouseModel[]> {
    return this.savedHouseList().length
      ? of(this.savedHouseList())
      : this.houseGateway
          .getHouses()
          .pipe(tap(houses => this.savedHouseList.set(houses)));
  }
}
