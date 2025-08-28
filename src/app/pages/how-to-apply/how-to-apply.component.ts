import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';

import { AngularModule, MaterialModule } from '@shared/modules';
import { EnHowToApplyComponent } from './en-how-to-apply/en-how-to-apply.component';
import { EsHowToApplyComponent } from './es-how-to-apply/es-how-to-apply.component';
import { LanguageService } from '@shared/services/language.service';
import { UnsubscribeSubject } from '@shared/models/global.interface';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-how-to-apply',
  imports: [
    AngularModule,
    MaterialModule,
    EnHowToApplyComponent,
    EsHowToApplyComponent,
  ],
  templateUrl: './how-to-apply.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HowToApplyComponent {
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
