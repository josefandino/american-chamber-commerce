import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';

import { Subject, takeUntil } from 'rxjs';

import { AngularModule, MaterialModule } from '@shared/modules';
import { LanguageService } from '@shared/services/language.service';
import { UnsubscribeSubject } from '@shared/models/global.interface';

import { EsHomeComponent } from './es-home/es-home.component';
import { EnHomeComponent } from './en-home/en-home.component';

@Component({
  selector: 'app-home',
  template: `
    @if (language() === 'es') {
      <app-es-home />
    } @else {
      <app-en-home />
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AngularModule, MaterialModule, EsHomeComponent, EnHomeComponent],
})
export default class HomeComponent implements OnInit {
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
