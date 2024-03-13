import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '@environment/environment';

import { Observable } from 'rxjs';

import { HouseModel } from '@houses/models/house.model';
import { AddHouseModel } from '@houses/models/add-house.model';

@Injectable({
  providedIn: 'root',
})
export class HouseGateway {
  private url = `${environment.baseUrl}/api/House`;
  private http = inject(HttpClient);

  public getHouses(): Observable<HouseModel[]> {
    return this.http.get<HouseModel[]>(`${this.url}`);
  }

  public getHouse(houseId: number): Observable<HouseModel> {
    return this.http.get<HouseModel>(`${this.url}/${houseId}`);
  }

  public getHousesByCity(cityId: number): Observable<HouseModel[]> {
    return this.http.get<HouseModel[]>(`${this.url}/city/${cityId}`);
  }

  public addHouse(house: AddHouseModel): Observable<HttpStatusCode> {
    return this.http.post<HttpStatusCode>(`${this.url}`, house);
  }
}
