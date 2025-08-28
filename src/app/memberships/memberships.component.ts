import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { MembershipsService } from './memberships.service';
import { AngularModule, MaterialModule } from '@shared/modules';
import { LanguageService } from '@shared/services/language.service';

import { EnMembershipComponent } from './en-membership/en-membership.component';
import { EsMembershipComponent } from './es-membership/es-membership.component';
import { Subject, takeUntil } from 'rxjs';
import { UnsubscribeSubject } from '@shared/models/global.interface';
@Component({
  selector: 'app-memberships',
  imports: [
    AngularModule,
    MaterialModule,
    EnMembershipComponent,
    EsMembershipComponent,
  ],
  template: ` @if (language() === 'en') {
      <app-en-membership />
    } @else {
      <app-es-membership />
    }`,
  styleUrl: './memberships.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MembershipsComponent {
  public language = signal('en');

  protected readonly unsubscribeAll: UnsubscribeSubject = new Subject<void>();

  private readonly _languageSvc = inject(LanguageService);

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
