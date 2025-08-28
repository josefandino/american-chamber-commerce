import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponseBase } from '@angular/common/http';
import { Observable, take, tap, catchError } from 'rxjs';

import { environment } from 'environments/environment.prod';

import { MembershipsI } from './memberships.interface';

@Injectable({
  providedIn: 'root',
})
export class MembershipsService {
  urlEsMemberships = environment.urlEsMemberships;
  urlEnMemberships = environment.urlEnMemberships;

  private readonly _http = inject(HttpClient);

  public getEsMemberships(): Observable<MembershipsI> {
    const url = `${this.urlEsMemberships}`;

    return this._http.get<MembershipsI>(url).pipe(
      take(1),
      tap((resp: MembershipsI) => resp),
      catchError((err: HttpResponseBase) => {
        throw err;
      }),
    );
  }

  public getEnMemberships(): Observable<MembershipsI> {
    const url = `${this.urlEnMemberships}`;

    return this._http.get<MembershipsI>(url).pipe(
      take(1),
      tap((resp: MembershipsI) => resp),
      catchError((err: HttpResponseBase) => {
        throw err;
      }),
    );
  }
}
