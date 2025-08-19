import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  constructor() {}

  private languageSubject: BehaviorSubject<string> =
    new BehaviorSubject<string>('en');
  public language$: Observable<string> = this.languageSubject.asObservable();

  getLanguage(): string {
    return this.languageSubject.value;
  }

  setLanguage(language: string): void {
    this.languageSubject.next(language);
  }
}
