import { Component, input, output, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { AngularModule, MaterialModule } from '@shared/modules';

@Component({
    selector: 'app-input-email',
    imports: [AngularModule, MaterialModule],
    templateUrl: './input-email.component.html',
    styleUrl: './input-email.component.scss'
})
export class InputEmailComponent implements OnInit {
  label = input.required<string>();
  control = input.required<FormControl>();
  isClear = input<boolean>(true);
  maxLength = input<number>(0);
  minLength = input<number>(0);

  clearInput = output<void>();
  minLengthError = output<void>();
  invalidEmailError = output<void>();

  ngOnInit() {
    this.control().setValidators([
      Validators.required,
      Validators.email,
      Validators.minLength(this.minLength()),
      Validators.maxLength(this.maxLength()),
    ]);
  }

  // Método para limpiar el valor del input
  clear(): void {
    this.control().setValue('');
    this.clearInput.emit();
  }

  // Método para limitar la longitud de caracteres en el input
  public limitInputLength(event: KeyboardEvent): void {
    // const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const input = event.target as HTMLInputElement;
    const key = event.key;
    const cursorPosition = input.selectionStart || 0;
    const currentValue = input.value;

    // Prevenir espacios al inicio
    if (key === ' ' && (cursorPosition === 0 || currentValue.length === 0)) {
      event.preventDefault();
      return;
    }

    // Prevenir múltiples espacios
    if (key === ' ' && currentValue[cursorPosition - 1] === ' ') {
      event.preventDefault();
      return;
    }

    // Validar otros caracteres
    if (!this.isValidChar(key) && key !== ' ') {
      event.preventDefault();
      return;
    }

    // Manejar la longitud máxima
    // const maxLengthValue = this.maxLength.value;
    const maxLengthValue = this.maxLength().valueOf();
    if (
      currentValue.length >= maxLengthValue &&
      key !== 'Backspace' &&
      key !== 'Delete'
    ) {
      event.preventDefault();
      return;
    }

    // Validar el valor después de la entrada
    setTimeout(() => {
      const updatedValue = input.value;
      const control = this.control();
      if (control) {
        control.setValue(updatedValue);

        if (control.errors) {
          if (control.errors['minLength']) {
            this.minLengthError.emit();
          }
          if (control.errors['email']) {
            this.invalidEmailError.emit();
          }
        }
      }
    }, 0);
  }

  // Método para validar caracteres permitidos
  private isValidChar(char: string): boolean {
    const validChars = /^[0-9a-zA-Z@._-]$/;
    return validChars.test(char);
  }
}
