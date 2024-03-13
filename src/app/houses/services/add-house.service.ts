import { Injectable, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';

import { Observable, catchError, throwError } from 'rxjs';

import { HouseGateway } from '@houses/services/house.gateway';
import { CityGateway } from '@cities/services/city.gateway';
import { CityModel } from '@cities/models/city.model';
import { StateGateway } from '@states/services/state.gateway';
import { StateModel } from '@states/models/state.model';
import { AddHouseModel } from '@houses/models/add-house.model';
import { ErrorModel } from '@models/error.model';
import { ServerErrorObjectType } from '@models/server-error.type';

@Injectable()
export class AddHouseService {
  private houseGateway = inject(HouseGateway);
  private citiesGateway = inject(CityGateway);
  private stateGateway = inject(StateGateway);
  private errorsSignal = signal<ErrorModel>({});

  public cities = toSignal(this.getCitites(), { initialValue: [] });
  public states = toSignal(this.getStates(), { initialValue: [] });
  public errors = this.errorsSignal.asReadonly();

  public addHouse(house: AddHouseModel): Observable<HttpStatusCode> {
    return this.houseGateway.addHouse(house).pipe(
      catchError((error: HttpErrorResponse) => {
        const errorObj: ServerErrorObjectType = error?.error;
        const errors = Object.entries(errorObj).reduce((acc, [key, value]) => {
          return {
            ...acc,
            [key]: value.errors[0].errorMessage,
          };
        }, {});

        this.errorsSignal.set(errors);

        return throwError(() => new Error());
      })
    );
  }

  private getCitites(): Observable<CityModel[]> {
    return this.citiesGateway.getCities({
      search: '',
      includeWithoutHouses: true,
    });
  }

  private getStates(): Observable<StateModel[]> {
    return this.stateGateway.getStates();
  }
}
