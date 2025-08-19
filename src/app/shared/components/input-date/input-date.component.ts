import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  input,
} from '@angular/core';
import { FormControl } from '@angular/forms';

import { AngularModule, MaterialModule } from '@shared/modules';

@Component({
  selector: 'app-input-date',
  standalone: true,
  imports: [AngularModule, MaterialModule],
  templateUrl: './input-date.component.html',
  styleUrl: './input-date.component.scss',
})
export class InputDateComponent {
  label = input.required<string>();
  control = input.required<FormControl>();
}
