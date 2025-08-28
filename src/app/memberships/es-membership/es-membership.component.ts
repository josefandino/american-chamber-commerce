import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { AngularModule, MaterialModule } from '@shared/modules';
import { FormMembershipsComponent } from '../form-memberships/form-memberships.component';
import { MembershipsService } from '../memberships.service';

@Component({
  selector: 'app-es-membership',
  imports: [AngularModule, MaterialModule, FormMembershipsComponent],
  templateUrl: './es-membership.component.html',
  styleUrl: '../memberships.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EsMembershipComponent {
  private readonly _membershipsService = inject(MembershipsService);

  public memberships$ = this._membershipsService.getEsMemberships();

  public formatBenefits(benefits: any) {
    const result: { label: string; active: boolean }[] = [];

    for (const key of Object.keys(benefits)) {
      if (key.endsWith('_bool')) {
        const baseKey = key.replace('_bool', '');
        result.push({
          label: benefits[baseKey],
          // true/false o número > 0
          active: Boolean(benefits[key]),
        });
      }
    }

    return result;
  }
}
