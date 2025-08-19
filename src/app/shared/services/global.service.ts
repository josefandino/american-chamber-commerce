import { HttpClient, HttpResponseBase } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ResponseI } from '@shared/models/global.interface';
import { Observable, tap, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  private _apiUrl = 'https://apichamber.uk/api/v1';

  private readonly _http = inject(HttpClient);

  constructor() {}

  public trimStringProperties(obj: any): any {
    return Object.entries(obj).reduce((acc, [key, value]) => {
      acc[key] = typeof value === 'string' ? value.trim() : value;
      return acc;
    }, {} as any);
  }

  public createAdmission(body: any): Observable<ResponseI> {
    const url = `${this._apiUrl}/register`;

    return this._http.post<ResponseI>(url, body).pipe(
      tap((resp: ResponseI) => {
        return resp;
      }),
      catchError((err: HttpResponseBase) => {
        throw err;
      }),
    );
  }
}
