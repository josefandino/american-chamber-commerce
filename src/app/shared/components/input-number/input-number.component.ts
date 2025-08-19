import { Component, EventEmitter, input, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

import { AngularModule, MaterialModule } from '@shared/modules';

@Component({
  selector: 'app-input-number',
  standalone: true,
  imports: [AngularModule, MaterialModule],
  templateUrl: './input-number.component.html',
  styleUrl: './input-number.component.scss',
})
export class InputNumberComponent {
  label = input.required<string>();
  control = input.required<FormControl>();
  isClear = input<boolean>(true);

  minLength = input<number>(0);
  maxLength = input<number>(Infinity);

  @Output() clearInput: EventEmitter<void> = new EventEmitter<void>();

  clear(): void {
    this.control().setValue('');
    this.clearInput.emit();
  }

  onKeyDown(event: KeyboardEvent): void {
    const input = event.target as HTMLInputElement;
    const key = event.key;
    const currentValue = input.value;

    // Permitir teclas de control
    if (this.isControlKey(key)) {
      return;
    }

    // Verificar si es un número
    if (!this.isNumber(key)) {
      event.preventDefault();
      return;
    }

    // Verificar longitud máxima
    if (currentValue.length >= this.maxLength()) {
      event.preventDefault();
      return;
    }
  }

  onInputChange(): void {
    const currentValue = this.control().value;
    if (currentValue && currentValue.length > this.maxLength()) {
      this.control().setValue(currentValue.slice(0, this.maxLength()));
    }
  }

  private isNumber(key: string): boolean {
    return /^\d$/.test(key);
  }

  private isControlKey(key: string): boolean {
    return [
      'Backspace',
      'Delete',
      'ArrowLeft',
      'ArrowRight',
      'Home',
      'End',
      'Tab',
    ].includes(key);
  }
}
