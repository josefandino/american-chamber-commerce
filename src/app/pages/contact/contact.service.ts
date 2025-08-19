import {
  HttpClient,
  HttpHeaderResponse,
  HttpHeaders,
  HttpResponseBase,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { Observable, tap, catchError, take } from 'rxjs';
import { ContactFormI } from './constact.interface';
import { ResponseI } from '@shared/models/global.interface';
import { environment } from 'environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private _apiUrl = environment.api_url;

  private _http = inject(HttpClient);

  // ============ METHODS ============

  private headers(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }

  public getAllContacts(): Observable<ContactFormI> {
    const url = `${this._apiUrl}/contact`;

    return this._http.get<ContactFormI>(url, { headers: this.headers() }).pipe(
      take(1),
      tap((resp: ContactFormI) => resp),
      catchError((err: HttpResponseBase) => {
        throw err;
      }),
    );
  }
  public createContact(body: ContactFormI): Observable<ResponseI> {
    const url = `${this._apiUrl}/contact`;

    return this._http
      .post<ResponseI>(url, body, { headers: this.headers() })
      .pipe(
        take(1),
        tap((resp: ResponseI) => resp),
        catchError((err: HttpResponseBase) => {
          throw err;
        }),
      );
  }
}
