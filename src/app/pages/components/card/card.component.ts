import { ChangeDetectionStrategy, Component } from '@angular/core';

import { AngularModule } from '@shared/modules';
import { MaterialModule } from '@shared/modules/material.module';

interface Program {
  title: string;
  desc: string;
  path: string;
}

@Component({
  selector: 'app-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AngularModule, MaterialModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  listPrograms: Program[] = [
    {
      title: 'Culinary Arts Technology',
      desc: 'Institute of Culinary Education',
      path: 'culinary-arts-technology',
    },
  ];
}
