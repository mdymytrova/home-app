import { Injectable, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';

import { Observable, catchError, of, switchMap } from 'rxjs';

import { HouseModel } from '@houses/models/house.model';
import { HouseGateway } from '@houses/services/house.gateway';

@Injectable()
export class HouseDetailsService {
  private houseGateway = inject(HouseGateway);

  private selectedHouseId = signal<number | null>(null);
  private houseErrorSignal = signal(false);

  private houseDetails$ = toObservable(this.selectedHouseId).pipe(
    switchMap(() => {
      return this.getHouse();
    })
  );

  public houseDetails = toSignal(this.houseDetails$, { initialValue: null });
  public houseError = this.houseErrorSignal.asReadonly();

  public loadHouseDetails(id: number): void {
    this.selectedHouseId.set(id);
  }

  public submitApplication(firstName: string, lastName: string, email: string) {
    console.log(firstName, lastName, email);
  }

  private getHouse(): Observable<HouseModel | null> {
    return this.houseGateway
      .getHouse(this.selectedHouseId() as number)
      .pipe(catchError(() => of(null)));
  }
}
