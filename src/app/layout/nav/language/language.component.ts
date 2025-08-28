import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Inject,
  signal,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AngularModule, MaterialModule } from '@shared/modules';
import { LanguageService } from '@shared/services/language.service';

@Component({
  selector: 'app-language',
  imports: [AngularModule, MaterialModule],
  templateUrl: './language.component.html',
  styleUrl: './language.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageComponent {
  public language = signal<string>('en');

  private readonly _languageSvc = inject(LanguageService);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _dialogRef: MatDialogRef<LanguageComponent>,
  ) {
    this.language.set(data);
  }

  public changeLanguage(language: string): void {
    this.language.set(language);
    this._languageSvc.setLanguage(language);
    this.executeAction();
  }

  private executeAction() {
    const data = this.language();
    this._dialogRef.close(data);
  }

  public cerrarDialogo(): void {
    this._dialogRef.close();
  }
}
