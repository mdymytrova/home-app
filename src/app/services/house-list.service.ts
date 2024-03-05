import { Injectable, computed, signal } from '@angular/core';

import { HouseModel } from '../models/house.model';
import { HousesData } from '../houses';

@Injectable({
  providedIn: 'root',
})
export class HouseListService {
  protected houseListSignal = signal<HouseModel[]>([]);
  protected houseDetailsSignal = signal<HouseModel | null>(null);
  protected searchSignal = signal<string>('');

  public houseList = computed(() => {
    const search = this.searchSignal();
    return this.houseListSignal().filter(house => {
      return house.city.includes(search);
    });
  });

  public houseDetails = this.houseDetailsSignal.asReadonly();

  constructor() {
    this.loadHouseList();
  }

  public loadHouseDetails(id: number): void {
    const house = this.houseList().find(house => house.id === id);
    this.houseDetailsSignal.set(house || null);
  }

  private loadHouseList(): void {
    this.houseListSignal.set(HousesData);
  }
}
