import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '@environment/environment';

import { Observable } from 'rxjs';

import { HouseModel } from '@houses/models/house.model';

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
}
