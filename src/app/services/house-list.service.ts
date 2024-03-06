import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { HouseModel } from '../models/house.model';

@Injectable({
  providedIn: 'root',
})
export class HouseListService {
  protected url = 'http://localhost:3000/locations';

  protected houseListSignal = signal<HouseModel[]>([]);
  protected houseDetailsSignal = signal<HouseModel | null>(null);
  protected searchSignal = signal<string>('');
  protected selectedHouseId = signal<number | null>(null);

  public houseList = computed(() => {
    const search = this.searchSignal();

    return search ? this.getFilteredHouses(search) : this.houseListSignal();
  });

  public houseDetails = computed(() => {
    const id = this.selectedHouseId();
    const house = this.houseList().find(house => Number(house.id) === id);
    return house || null;
  });

  private http = inject(HttpClient);

  constructor() {
    this.loadHouseList();
  }

  public setSearch(search: string): void {
    this.searchSignal.set(search.trim().toLowerCase());
  }

  public loadHouseDetails(id: number): void {
    this.selectedHouseId.set(id);
  }

  public submitApplication(firstName: string, lastName: string, email: string) {
    console.log(firstName, lastName, email);
  }

  private loadHouseList(): void {
    this.http.get<HouseModel[]>(this.url).subscribe((data: HouseModel[]) => {
      this.houseListSignal.set(data);
    });
  }

  private getFilteredHouses(search: string): HouseModel[] {
    return this.houseListSignal().filter(
      house =>
        house.city.trim().toLowerCase().includes(search) ||
        house.state.trim().toLowerCase().includes(search) ||
        house.name.trim().toLowerCase().includes(search)
    );
  }
}
