import { HttpResponseBase } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
} from '@angular/core';
import { Subject, catchError, takeUntil } from 'rxjs';
import { MembershipsService } from './memberships.service';
import { AngularModule, MaterialModule } from '@shared/modules';
import { FormMembershipsComponent } from './form-memberships/form-memberships.component';

@Component({
  selector: 'app-memberships',
  imports: [AngularModule, MaterialModule, FormMembershipsComponent],
  templateUrl: './memberships.component.html',
  styleUrl: './memberships.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MembershipsComponent {
  private readonly _membershipsService = inject(MembershipsService);

  public memberships$ = this._membershipsService.getMemberships();

  public formatBenefits(benefits: any) {
    const result: { label: string; active: boolean }[] = [];

    for (const key of Object.keys(benefits)) {
      if (key.endsWith('_bool')) {
        const baseKey = key.replace('_bool', '');
        result.push({
          label: benefits[baseKey], // el texto descriptivo
          active: Boolean(benefits[key]), // true/false o número > 0
        });
      }
    }

    return result;
  }
}
