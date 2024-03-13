import { Injectable, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';

import { Observable, catchError, of, switchMap } from 'rxjs';

import { HouseGateway } from '@houses/services/house.gateway';
import { HouseModel } from '@houses/models/house.model';
import { CityModel } from '@cities/models/city.model';
import { CityGateway } from '@cities/services/city.gateway';

@Injectable()
export class CityDetailsService {
  private houseGateway = inject(HouseGateway);
  private cityGateway = inject(CityGateway);
  private selectedCityId = signal<number | null>(null);

  private houseList$ = toObservable(this.selectedCityId).pipe(
    switchMap((cityId: number | null) => this.getHouses(cityId as number))
  );

  private city$ = toObservable(this.selectedCityId).pipe(
    switchMap((cityId: number | null) => this.getCity(cityId as number))
  );

  public houseList = toSignal(this.houseList$, { initialValue: [] });
  public city = toSignal(this.city$);

  public loadCityDetails(id: number): void {
    this.selectedCityId.set(id);
  }

  private getHouses(cityId: number): Observable<HouseModel[]> {
    return this.houseGateway
      .getHousesByCity(cityId)
      .pipe(catchError(() => of([])));
  }

  private getCity(cityId: number): Observable<CityModel | null> {
    return this.cityGateway.getCity(cityId).pipe(catchError(() => of(null)));
  }
}
