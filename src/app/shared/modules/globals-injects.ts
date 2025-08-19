import { ChangeDetectorRef, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

import { takeUntil } from 'rxjs';

export class GlobalsInjects {
  // ==================== SIGNALS ====================
  protected isSpinner = signal<boolean>(true);

  // =============== Constants ===============

  // ==================== INJECTS ====================
  protected readonly _router = inject(Router);
  protected readonly _actRoute = inject(ActivatedRoute);

  protected readonly _fb = inject(FormBuilder);


  protected readonly _cd = inject(ChangeDetectorRef);

  protected readonly _takeUntil = takeUntil;
}
