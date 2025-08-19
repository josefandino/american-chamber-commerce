import { HttpClient, HttpResponseBase } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { catchError, Observable, take, tap } from 'rxjs';

import { AccordionItem } from '@shared/components/accordion/accordion.interface';
import { CountriesI } from '@shared/models/countries.interface';
import { CountryProvinceI } from '@shared/models/provinces.interface';

@Injectable({
  providedIn: 'root',
})
export class ListProgramsService {
  urlPrograms = '/assets/data/list-programs.json';
  urlCountries = '/assets/data/countries.json';
  urlProvince = '/assets/data/provinces.json';

  private readonly _http = inject(HttpClient);

  public getPrograms(): Observable<AccordionItem[]> {
    const url = `${this.urlPrograms}`;

    return this._http.get<AccordionItem[]>(url).pipe(
      take(1),
      tap((resp: AccordionItem[]) => resp),
      catchError((err: HttpResponseBase) => {
        throw err;
      }),
    );
  }

  public getCountries(): Observable<CountriesI[]> {
    const url = `${this.urlCountries}`;

    return this._http.get<CountriesI[]>(url).pipe(
      take(1),
      tap((resp: CountriesI[]) => resp),
      catchError((err: HttpResponseBase) => {
        throw err;
      }),
    );
  }

  public getProvince(): Observable<CountryProvinceI> {
    const url = `${this.urlProvince}`;

    return this._http.get<CountryProvinceI>(url).pipe(
      take(1),
      tap((resp: CountryProvinceI) => resp),
      catchError((err: HttpResponseBase) => {
        throw err;
      }),
    );
  }
}
