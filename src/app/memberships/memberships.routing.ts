import { Route } from '@angular/router';

export const membershipsRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./memberships.component').then((m) => m.MembershipsComponent),
  },
];
