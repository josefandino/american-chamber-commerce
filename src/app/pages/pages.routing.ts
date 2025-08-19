import { Routes } from '@angular/router';
import { ContactComponent } from './contact/contact.component';

export const PagesRouting: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () => import('./home/home.component'),
  },
  {
    path: 'about',
    loadComponent: () => import('./about/about.component'),
  },

  {
    path: 'how-to-apply',
    loadComponent: () =>
      import('./how-to-apply/how-to-apply.component').then(
        (c) => c.HowToApplyComponent,
      ),
  },
  {
    path: 'contact',
    component: ContactComponent,
  },

  // ======== Documentos =========
];
