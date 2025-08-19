import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { AngularModule, MaterialModule } from '@shared/modules';

@Component({
  selector: 'app-input-checkbox',
  standalone: true,
  imports: [AngularModule, MaterialModule],
  templateUrl: './input-checkbox.component.html',
  styleUrl: './input-checkbox.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class InputCheckboxComponent {
  isChecked = false;

  @Input() label: string = '';
  @Input() control!: FormControl;
  @Input() isClear: boolean = true;

  @Input() maxLength: number = 0;

  @Output() clearInput: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  clear(): void {
    this.control.setValue('');
    this.clearInput.emit();
  }

  onChange(event: any) {
    // this.isChecked = event.checked;
  }

  onFocus() {
    if (this.isChecked) {
      const checkboxContainer = document.querySelector('.ckeck');
      if (checkboxContainer) {
        checkboxContainer.classList.add('focused');
      }
    }
  }

  onBlur() {
    const checkboxContainer = document.querySelector('.ckeck');
    if (checkboxContainer) {
      checkboxContainer.classList.remove('focused');
    }
  }
}
