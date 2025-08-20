import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BehaviorSubject, catchError, combineLatest, map } from 'rxjs';

import { HttpResponseBase } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { MatFormField } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

import { EventsService } from './events.service';
import { EventsI } from './interface.events';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-events',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatOption,
    MatFormField,
    MatInputModule,
    MatSelect,
    MatIcon,
  ],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventsComponent {
  private readonly _eventsService = inject(EventsService);

  // Filtros en estado
  private filterType$ = new BehaviorSubject<string>('all');
  private filterTime$ = new BehaviorSubject<'upcoming' | 'past'>('upcoming');

  public currentTimeFilter: 'upcoming' | 'past' = 'upcoming';

  // Todos los eventos crudos
  public allEvents$ = this._eventsService.getEvents().pipe(
    catchError((err: HttpResponseBase) => {
      throw err;
    }),
  );

  // Eventos filtrados combinando type + time
  public events$ = combineLatest([
    this.allEvents$,
    this.filterType$,
    this.filterTime$,
  ]).pipe(
    map(([events, type, time]) => {
      const today = new Date();

      return (
        events
          // filtro por tiempo
          .filter((e: EventsI) => {
            const eventDate = new Date(e.date);
            return time === 'upcoming' ? eventDate >= today : eventDate < today;
          })
          // filtro por tipo
          .filter((e: EventsI) =>
            type === 'all' ? true : e.event_type === type,
          )
      );
    }),
  );

  // Métodos públicos para aplicar filtros
  public filterEvents(type: string): void {
    this.filterType$.next(type);
  }

  // public filterTime(time: 'upcoming' | 'past') {
  //   this.filterTime$.next(time);
  // }

  public filterTime(time: 'upcoming' | 'past'): void {
    this.currentTimeFilter = time;
    this.filterTime$.next(time);
  }
}
