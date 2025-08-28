import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { EnServiciosComponent } from './en-servicios/en-servicios.component';
import { EsServiciosComponent } from './es-servicios/es-servicios.component';

import { UnsubscribeSubject } from '@shared/models/global.interface';
import { LanguageService } from '@shared/services/language.service';

@Component({
  selector: 'app-servicios',
  imports: [EsServiciosComponent, EnServiciosComponent],
  template: ` @if (language() === 'en') {
      <app-en-servicios />
    } @else {
      <app-es-servicios />
    }`,
  styleUrl: './servicios.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiciosComponent implements OnInit {
  public language = signal<string>('en');

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
