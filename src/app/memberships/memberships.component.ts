import { HttpResponseBase } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
} from '@angular/core';
import { Subject, catchError, takeUntil } from 'rxjs';
import { MembershipsService } from './memberships.service';
import { AngularModule } from '@shared/modules';

@Component({
  selector: 'app-memberships',
  imports: [AngularModule],
  templateUrl: './memberships.component.html',
  styleUrl: './memberships.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MembershipsComponent implements OnDestroy {
  private readonly _membershipsService = inject(MembershipsService);
  private unsubscribeAll: Subject<any> = new Subject();

  public memberships$ = this._membershipsService.getMemberships();

  // public memberships$ = this._membershipsService.getMemberships().pipe(
  //   catchError((err: HttpResponseBase) => {
  //     throw err;
  //   }),
  //   takeUntil(this.unsubscribeAll),
  // );

  ngOnDestroy(): void {
    this.unsubscribeAll.next(null);
    this.unsubscribeAll.complete();
  }
}
