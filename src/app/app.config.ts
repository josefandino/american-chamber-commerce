import { ApplicationConfig } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';

import { provideAnimations } from '@angular/platform-browser/animations';
import { HashLocationStrategy } from '@angular/common';
import { provideToastr } from 'ngx-toastr';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { routes } from './app.routes';
import {
  provideClientHydration,
  withHttpTransferCacheOptions,
} from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withHashLocation()),

    provideAnimations(),
    HashLocationStrategy,
    provideAnimationsAsync(),

    provideHttpClient(withInterceptorsFromDi()),
    provideClientHydration(
      withHttpTransferCacheOptions({ includePostRequests: true }),
    ),

    // Toastr
    provideToastr({
      positionClass: 'toast-top-center',
      preventDuplicates: false,
      progressBar: true,
      progressAnimation: 'increasing',
      timeOut: 4000,
      easeTime: 300,
      closeButton: true,
      tapToDismiss: true,
      extendedTimeOut: 1000,
    }),
  ],
};
