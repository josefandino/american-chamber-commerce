import { Route } from '@angular/router';

export const eventsRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'events',
  },
  {
    path: '',
    loadComponent: () =>
      import('./events.component').then((c) => c.EventsComponent),
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'events',
  },
];
