import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  output,
  signal,
} from '@angular/core';

import { AngularModule, MaterialModule } from '@shared/modules';

import { LanguageService } from '@shared/services/language.service';
import { Subject, takeUntil } from 'rxjs';
import { UnsubscribeSubject } from '@shared/models/global.interface';

@Component({
  selector: 'app-overlay-menu',
  imports: [AngularModule, MaterialModule],
  templateUrl: './overlay-menu.component.html',
  styleUrl: './overlay-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverlayMenuComponent implements OnInit {
  private localLanguage = localStorage.getItem('language');

  public language = signal<string>('en');

  private readonly _languageSvc = inject(LanguageService);

  protected readonly unsubscribeAll: UnsubscribeSubject = new Subject<void>();

  public listProgramsEs = signal<any[]>([]);
  public listProgramsEn = signal<any[]>([]);

  readonly handleChangeOverlay = output<void>();

  public isOverflow = signal<boolean>(false);

  // private readonly _programsSvc = inject(ProgramsService);

  constructor() {
    this.language.set(this.localLanguage || 'en');
  }

  ngOnInit(): void {
    this.listenerLanguage();
  }

  private listenerLanguage(): void {
    this._languageSvc.language$
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((langue: string) => {
        this.language.set(langue);
        this.getPrograms(langue);
      });
  }

  public emitEventOverlay(): void {
    this.handleChangeOverlay.emit();
  }

  private getPrograms(langue: string): void {
    if (langue === 'es') {
      // this._programsSvc.esLanguage().subscribe((resp: ProgramsI[]) => {
      //   this.listProgramsEs.set(resp);
      // });
    } else {
      // this._programsSvc.enLanguage().subscribe((resp: ProgramsI[]) => {
      //   this.listProgramsEn.set(resp);
      // });
    }
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
}
