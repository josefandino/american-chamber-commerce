import { Component, input } from '@angular/core';
import { FormControl } from '@angular/forms';

import { AngularModule, MaterialModule } from '@shared/modules';

@Component({
  selector: 'app-input-date-full',
  standalone: true,
  imports: [AngularModule, MaterialModule],
  templateUrl: './input-date-full.component.html',
  styleUrl: './input-date-full.component.scss',
})
export class InputDateFullComponent {
  label = input.required<string>();
  control = input.required<FormControl>();
}
