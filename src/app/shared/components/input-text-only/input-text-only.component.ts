import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { FormControl } from '@angular/forms';

import { AngularModule, MaterialModule } from '@shared/modules';

@Component({
    selector: 'app-input-text-only',
    imports: [AngularModule, MaterialModule],
    templateUrl: './input-text-only.component.html',
    styleUrl: './input-text-only.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputTextOnlyComponent {
  label = input.required<string>();
  control = input.required<FormControl>();
  isClear = input<boolean>(true);
  maxLength = input<number>(0);
  minLength = input<number>(0);

  clearInput = output<void>();
  minLengthError = output<void>();

  clear(): void {
    this.control().setValue('');
    this.clearInput.emit();
  }

  public limitInputLength(event: KeyboardEvent): void {
    this.validateCharacter(event);

    const currentValue = this.control().value;
    const maxLengthReached = currentValue.length >= this.maxLength;

    if (maxLengthReached) {
      const truncatedValue = currentValue.slice(0, this.maxLength);
      this.control().setValue(truncatedValue);
    }

    const minLengthNotReached = currentValue.length < this.minLength;
    if (minLengthNotReached) {
      this.minLengthError.emit();
    }
  }

  private validateCharacter(event: KeyboardEvent): void {
    const key = event.key;
    const input = event.target as HTMLInputElement;
    const currentValue = input.value;
    const cursorPosition = input.selectionStart || 0;

    const charCode = event.charCode || event.keyCode;
    if (charCode === 42 || charCode === 168) {
      event.preventDefault();
      return;
    }

    const isValidChar = (char: string): boolean => {
      const validChars = /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ]$/;
      return validChars.test(char);
    };

    if (key === ' ') {
      if (cursorPosition === 0 || currentValue.length === 0) {
        event.preventDefault();
        return;
      }
      if (currentValue[cursorPosition - 1] === ' ') {
        event.preventDefault();
        return;
      }
      return;
    }

    if (!isValidChar(key)) {
      event.preventDefault();
    }
  }
}
