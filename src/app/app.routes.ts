import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '',
    loadChildren: () =>
      import('./pages/pages.routing').then((r) => r.PagesRouting),
  },
  {
    path: 'services',
    loadChildren: () =>
      import('./servicios/sericios.routing').then((r) => r.servicesRoutes),
  },
  {
    path: 'events',
    loadChildren: () =>
      import('./events/events.routing').then((r) => r.eventsRoutes),
  },
  {
    path: 'memberships',
    loadChildren: () =>
      import('./memberships/memberships.routing').then(
        (r) => r.membershipsRoutes,
      ),
  },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];
