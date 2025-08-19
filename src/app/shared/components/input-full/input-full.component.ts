import { Component, EventEmitter, input, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

import { AngularModule, MaterialModule } from '@shared/modules';

@Component({
  selector: 'app-input-full',
  standalone: true,
  imports: [AngularModule, MaterialModule],
  templateUrl: './input-full.component.html',
  styleUrl: './input-full.component.scss',
})
export class InputFullComponent {
  label = input.required<string>();
  control = input.required<FormControl>();
  isClear = input<boolean>(true);

  @Input() maxLength: number = 0;
  @Input() minLength: number = 0;

  @Output() clearInput: EventEmitter<void> = new EventEmitter<void>();
  @Output() minLengthError: EventEmitter<void> = new EventEmitter<void>();

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
      const validChars = /^.*$/;
      return validChars.test(char);
    };

    // Manejar el caso de espacio
    if (key === ' ') {
      // No permitir espacio al inicio
      if (cursorPosition === 0 || currentValue.length === 0) {
        event.preventDefault();
        return;
      }
      // No permitir múltiples espacios
      if (currentValue[cursorPosition - 1] === ' ') {
        event.preventDefault();
        return;
      }
      // Permitir un solo espacio después de un carácter válido
      return;
    }

    // Verificar otros caracteres
    if (!isValidChar(key)) {
      event.preventDefault();
    }
  }
}
