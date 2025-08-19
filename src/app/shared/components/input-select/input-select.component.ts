import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

import { AngularModule, MaterialModule } from '@shared/modules';

export interface Option {
  id: string;
  [key: string]: any;
}

@Component({
    selector: 'app-input-select',
    imports: [AngularModule, MaterialModule],
    templateUrl: './input-select.component.html',
    styleUrl: './input-select.component.scss'
})
export class InputSelectComponent {
  @Input() label: string = '';
  @Input() labelSelect: string = '';
  @Input() value: string = '';
  @Input() control!: FormControl;
  @Input() defaultValue: string = '';
  @Input() defaultOptions: Option[] = [];

  @Output() clearInput: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  clear(): void {
    this.control.setValue('');
    this.clearInput.emit();
  }
}
