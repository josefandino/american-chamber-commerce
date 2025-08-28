import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  // private languageSubject: BehaviorSubject<string> =
  //   new BehaviorSubject<string>('en');
  // public language$: Observable<string> = this.languageSubject.asObservable();

  // getLanguage(): string {
  //   return this.languageSubject.value;
  // }

  // setLanguage(language: string): void {
  //   this.languageSubject.next(language);
  // }

  private readonly storageKey = 'language';

  private languageSubject: BehaviorSubject<string>;
  public language$: Observable<string>;

  private readonly _storage = inject(StorageService);

  constructor() {
    const savedLang = this._storage.getItem(this.storageKey) ?? 'es';
    this.languageSubject = new BehaviorSubject<string>(savedLang);
    this.language$ = this.languageSubject.asObservable();
  }

  getLanguage(): string {
    return this.languageSubject.value;
  }

  setLanguage(language: string): void {
    this.languageSubject.next(language);
    this._storage.setItem(this.storageKey, language);
  }
}
