import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';

import { map, Observable, Subject, switchMap, takeUntil } from 'rxjs';

import { EventsService } from '../events.service';
import { EventsI } from '../interface.events';
import { MatIcon } from '@angular/material/icon';
import { AngularModule } from '@shared/modules';
import { RegisterEventComponent } from '../register-event/register-event.component';

@Component({
  selector: 'app-event-detail',
  imports: [AngularModule, MatIcon, RegisterEventComponent],
  templateUrl: './event-detail.component.html',
  styleUrl: './event-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventDetailComponent implements OnDestroy {
  protected readonly unsubscribeAll: Subject<any> = new Subject<any>();

  private _actRoute = inject(ActivatedRoute);
  private _eventsService = inject(EventsService);

  // Stream del evento único
  public event$!: Observable<EventsI | undefined>;

  ngOnInit(): void {
    this.event$ = this._actRoute.params
      .pipe(
        switchMap((params: Params) =>
          this._eventsService
            .getEvents()
            .pipe(
              map((events: EventsI[]) =>
                events.find((e) => e.id === +params['id']),
              ),
            ),
        ),
      )
      .pipe(takeUntil(this.unsubscribeAll));
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next(null);
    this.unsubscribeAll.complete();
  }
}
