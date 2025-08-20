import { HttpClient, HttpResponseBase } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { EventsI } from './interface.events';
import { catchError, Observable, take, tap } from 'rxjs';
import { environment } from 'environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  urlEvents = environment.urlEvents;

  private readonly _http = inject(HttpClient);

  public getEvents(): Observable<EventsI[]> {
    const url = `${this.urlEvents}`;

    return this._http.get<EventsI[]>(url).pipe(
      take(1),
      tap((resp: EventsI[]) => resp),
      catchError((err: HttpResponseBase) => {
        throw err;
      }),
    );
  }
}
