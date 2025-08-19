import { Component, inject, signal } from '@angular/core';

import { Subject, takeUntil } from 'rxjs';

import { UnsubscribeSubject } from '@shared/models/global.interface';
import { AngularModule } from '@shared/modules';
import { LanguageService } from '@shared/services/language.service';
import { CHAMBER_INFO } from '@shared/const/info-acc';

@Component({
  selector: 'app-footer',
  imports: [AngularModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  title = 'American Chamber Commerce';
  year = new Date().getFullYear();

  private localLanguage = localStorage.getItem('language');

  public language = signal<string>('en');

  readonly chamberInfo = CHAMBER_INFO;
  private readonly _languageSvc = inject(LanguageService);

  protected readonly unsubscribeAll: UnsubscribeSubject = new Subject<void>();

  constructor() {
    this.language.set(this.localLanguage || 'en');
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
