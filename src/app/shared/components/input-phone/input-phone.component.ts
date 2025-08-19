import { Component, input, output } from '@angular/core';
import { FormControl } from '@angular/forms';

import { AngularModule, MaterialModule } from '@shared/modules';

@Component({
    selector: 'app-input-phone',
    imports: [AngularModule, MaterialModule],
    templateUrl: './input-phone.component.html',
    styleUrl: './input-phone.component.scss'
})
export class InputPhoneComponent {
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

    // Función para verificar si un carácter es válido
    const isValidChar = (char: string): boolean => {
      // const validChars = /^[0-9()+ ]+$/;
      const validChars = /^[0-9 ]/;
      return validChars.test(char);
    };

    // Verificar cuántos caracteres especiales ya están presentes
    const countOccurrences = (str: string, char: string) => {
      return str.split(char).length - 1;
    };

    const plusCount = countOccurrences(currentValue, '+');
    const openParenCount = countOccurrences(currentValue, '(');
    const closeParenCount = countOccurrences(currentValue, ')');

    // No permitir espacio al inicio
    if (key === ' ' && (cursorPosition === 0 || currentValue.length === 0)) {
      event.preventDefault();
      return;
    }

    // No permitir múltiples espacios consecutivos
    if (key === ' ' && currentValue[cursorPosition - 1] === ' ') {
      event.preventDefault();
      return;
    }

    // Permitir solo un signo '+'
    if (key === '+' && plusCount >= 1) {
      event.preventDefault();
      return;
    }

    // Permitir solo un par de paréntesis '('
    if (key === '(' && openParenCount >= 1) {
      event.preventDefault();
      return;
    }

    // Permitir solo un par de paréntesis ')'
    if (key === ')' && closeParenCount >= 1) {
      event.preventDefault();
      return;
    }

    // Verificar otros caracteres
    if (!isValidChar(key)) {
      event.preventDefault();
    }
  }
}
