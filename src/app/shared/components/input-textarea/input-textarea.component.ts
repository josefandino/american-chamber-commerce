import { Component, input, output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MaterialModule, AngularModule } from '@shared/modules';

@Component({
    selector: 'app-input-textarea',
    imports: [AngularModule, MaterialModule],
    templateUrl: './input-textarea.component.html',
    styleUrl: './input-textarea.component.scss'
})
export class InputTextareaComponent {
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

    // No permitir espacios al inicio
    if (key === ' ' && (cursorPosition === 0 || currentValue.length === 0)) {
      event.preventDefault();
      return;
    }

    // No permitir más de dos espacios entre palabras
    const previousChar = currentValue[cursorPosition - 1];
    const prePreviousChar = currentValue[cursorPosition - 2];
    if (key === ' ' && previousChar === ' ' && prePreviousChar === ' ') {
      event.preventDefault();
      return;
    }

    // Validar otros caracteres (solo letras y algunos caracteres válidos)
    const isValidChar = (char: string): boolean => {
      const validChars = /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ]$/;
      return validChars.test(char);
    };

    if (!isValidChar(key)) {
      event.preventDefault();
    }
  }
}
