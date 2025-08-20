import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '',
    loadChildren: () =>
      import('./pages/pages.routing').then((r) => r.PagesRouting),
  },
  {
    path: 'events',
    loadChildren: () =>
      import('./events/events.routing').then((r) => r.eventsRoutes),
  },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];
