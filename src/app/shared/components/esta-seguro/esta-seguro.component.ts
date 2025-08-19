import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { AngularModule, MaterialModule } from '@shared/modules';

@Component({
  selector: 'app-esta-seguro',
  imports: [AngularModule, MaterialModule],
  templateUrl: './esta-seguro.component.html',
  styleUrl: './esta-seguro.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EstaSeguroComponent {
  id: string = '';
  action: string = '';
  message: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _dialogRef: MatDialogRef<EstaSeguroComponent>,
  ) {
    this.id = data.data.id;
    this.action = data.action;
    this.message = data.message;
  }

  executeAction() {
    const data = {
      id: this.id,
      action: this.action,
    };
    this._dialogRef.close(data);
  }

  cerrarDialogo(): void {
    this._dialogRef.close();
  }
}
