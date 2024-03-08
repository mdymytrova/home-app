import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';

import { Observable, map, of, switchMap, tap } from 'rxjs';

import { HouseModel } from '../models/house.model';

@Injectable({
  providedIn: 'root',
})
export class HouseListService {
  private url = 'http://localhost:3000/locations';
  private http = inject(HttpClient);

  private searchSignal = signal<string>('');

  private savedHouseList = signal([] as HouseModel[]);
  private houseList$ = toObservable(this.searchSignal).pipe(
    switchMap((search: string) =>
      this.getHouseList().pipe(
        map(houses => this.getFilteredHouseList(houses, search))
      )
    )
  );
  private selectedHouseId = signal<number | null>(null);

  public houseList = toSignal(this.houseList$, { initialValue: [] });

  public houseDetails = computed(() => {
    const id = this.selectedHouseId();
    const house = this.houseList().find(house => Number(house.id) === id);
    return house || null;
  });

  public setSearch(search: string): void {
    this.searchSignal.set(search);
  }

  public loadHouseDetails(id: number): void {
    this.selectedHouseId.set(id);
  }

  public submitApplication(firstName: string, lastName: string, email: string) {
    console.log(firstName, lastName, email);
  }

  private getFilteredHouseList(
    houses: HouseModel[],
    search: string
  ): HouseModel[] {
    return !search
      ? houses
      : houses.filter(house => {
          return (
            house.city.trim().toLowerCase().includes(search) ||
            house.state.trim().toLowerCase().includes(search) ||
            house.name.trim().toLowerCase().includes(search)
          );
        });
  }

  private getHouseList(): Observable<HouseModel[]> {
    return this.savedHouseList().length
      ? of(this.savedHouseList())
      : this.http
          .get<HouseModel[]>(this.url)
          .pipe(tap(houses => this.savedHouseList.set(houses)));
  }
}
