import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map } from 'rxjs';

import { MensajeGlobal } from '../shared/helpers/mensaje-global';

@Injectable({ providedIn: 'root' })
export class ConfigService {
  private apiUrlSubject: BehaviorSubject<string> = new BehaviorSubject<string>(
    '',
  );
  public apiUrl$: Observable<string> = this.apiUrlSubject.asObservable();

  private _m = inject(MensajeGlobal);
  private _http = inject(HttpClient);

  constructor() {
    this.loadConfigRoutes();
  }

  private loadConfig(): Observable<any> {
    return this._http.get<any>('../../assets/config/config.json').pipe(
      map((path: any) => path.appConfig),
      catchError((err: any) => {
        this._m.error(err);
        throw err;
      }),
    );
  }

  private loadConfigRoutes(): void {
    this.loadConfig().subscribe({
      next: (config: any) => {
        this.apiUrlSubject.next(config.apiUrl || '');
      },
      error: (err: any) => {
        this._m.error(err);
        throw err;
      },
    });
  }

  getApiUrl(): Observable<string> {
    return this.apiUrl$;
  }
}
