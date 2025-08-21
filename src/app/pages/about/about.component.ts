import { Component, inject, OnInit, signal } from '@angular/core';
import { UnsubscribeSubject } from '@shared/models/global.interface';
import { LanguageService } from '@shared/services/language.service';
import { Subject, takeUntil } from 'rxjs';
import EnAboutComponent from './en-about/about.component';
import EsAboutComponent from './es-about/about.component';

@Component({
  selector: 'app-about',
  imports: [EnAboutComponent, EsAboutComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export default class AboutComponent implements OnInit {
  private localLanguage = localStorage.getItem('language');

  public language = signal<string>('en');

  private readonly _languageSvc = inject(LanguageService);

  protected readonly unsubscribeAll: UnsubscribeSubject = new Subject<void>();

  constructor() {
    this.language.set(this.localLanguage || 'es');
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
