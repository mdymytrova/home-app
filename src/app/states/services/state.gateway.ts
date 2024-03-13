import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '@environment/environment';

import { Observable } from 'rxjs';

import { StateModel } from '@states/models/state.model';

@Injectable({
  providedIn: 'root',
})
export class StateGateway {
  private url = `${environment.baseUrl}/api/State`;
  private http = inject(HttpClient);

  public getStates(): Observable<StateModel[]> {
    return this.http.get<StateModel[]>(`${this.url}`);
  }
}
