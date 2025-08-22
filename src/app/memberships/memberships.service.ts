import { HttpClient, HttpResponseBase } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'environments/environment.prod';
import { Observable, take, tap, catchError, map } from 'rxjs';
import { MembershipsI } from './memberships.interface';

@Injectable({
  providedIn: 'root',
})
export class MembershipsService {
  urlMemberships = environment.urlMemberships;

  private readonly _http = inject(HttpClient);

  // public getMemberships(): Observable<MembershipI[]> {
  //   const url = `${this.urlMemberships}`;

  //   return this._http.get<MembershipI[]>(url).pipe(
  //     take(1),
  //     tap((resp: MembershipI[]) => resp),
  //     catchError((err: HttpResponseBase) => {
  //       throw err;
  //     }),
  //   );
  // }

  public getMemberships(): Observable<MembershipsI> {
    const url = `${this.urlMemberships}`;

    return this._http.get<MembershipsI>(url).pipe(
      take(1),
      tap((resp: MembershipsI) => resp),
      catchError((err: HttpResponseBase) => {
        throw err;
      }),
    );
  }
}
