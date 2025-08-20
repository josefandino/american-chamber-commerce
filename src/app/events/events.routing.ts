import { Route } from '@angular/router';

export const eventsRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./events.component').then((c) => c.EventsComponent),
  },
  {
    path: ':id/:slug',
    loadComponent: () =>
      import('./event-detail/event-detail.component').then(
        (c) => c.EventDetailComponent,
      ),
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'events',
  },
];
