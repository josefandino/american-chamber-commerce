import { Route } from '@angular/router';

export const servicesRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./servicios.component').then((m) => m.ServiciosComponent),
  },
];
