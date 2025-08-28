import { Component, inject, OnInit, signal } from '@angular/core';

import { Subject, takeUntil } from 'rxjs';

import { UnsubscribeSubject } from '@shared/models/global.interface';
import { LanguageService } from '@shared/services/language.service';

import EnAboutComponent from './en-about/about.component';
import EsAboutComponent from './es-about/about.component';

@Component({
  selector: 'app-about',
  imports: [EsAboutComponent, EnAboutComponent],
  template: ` @if (language() === 'es') {
      <app-es-about />
    } @else {
      <app-en-about />
    }`,
  styleUrl: './about.component.scss',
})
export default class AboutComponent implements OnInit {
  public language = signal<string>('es');

  private readonly _languageSvc = inject(LanguageService);

  protected readonly unsubscribeAll: UnsubscribeSubject = new Subject<void>();

  constructor() {
    this.language.set(this._languageSvc.getLanguage());
  }

  ngOnInit() {
    this.listenerLanguage();
  }

  private listenerLanguage(): void {
    this._languageSvc.language$
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((langue: string) => {
        this.language.set(langue);
      });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
}
