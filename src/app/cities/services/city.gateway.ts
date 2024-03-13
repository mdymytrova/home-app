import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '@environment/environment';

import { Observable } from 'rxjs';

import { CityModel } from '@cities/models/city.model';
import { CityFilterModel } from '@cities/models/city-filter.model';

@Injectable({
  providedIn: 'root',
})
export class CityGateway {
  private url = `${environment.baseUrl}/api/City`;
  private http = inject(HttpClient);

  public getCities(cityFilter: CityFilterModel): Observable<CityModel[]> {
    return this.http.post<CityModel[]>(`${this.url}/Cities`, cityFilter);
  }

  public getCity(cityId: number): Observable<CityModel> {
    return this.http.get<CityModel>(`${this.url}/${cityId}`);
  }
}
