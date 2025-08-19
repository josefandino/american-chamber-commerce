import {
  Injectable,
  signal,
  computed,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { fromEvent, debounceTime } from 'rxjs';

export interface ViewportBreakpoints {
  mobile: number;
  tablet: number;
  laptop: number;
  desktop: number;
}

@Injectable({
  providedIn: 'root',
})
export class ScreenSizeService {
  private readonly platformId = inject(PLATFORM_ID);

  private readonly breakpoints: ViewportBreakpoints = {
    mobile: 720,
    tablet: 1024,
    laptop: 1280,
    desktop: 1440,
  };

  public readonly screenWidth = signal<number>(Number.NaN);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const setW = () => this.screenWidth.set(window.innerWidth);

      this.screenWidth.set(window.innerWidth);
      requestAnimationFrame(setW);

      fromEvent(window, 'resize').pipe(debounceTime(80)).subscribe(setW);
      fromEvent(window, 'orientationchange').subscribe(setW);

      try {
        const mqlMobile = window.matchMedia(
          `(max-width:${this.breakpoints.mobile - 1}px)`,
        );
        const mqlTablet = window.matchMedia(
          `(min-width:${this.breakpoints.mobile}px) and (max-width:${
            this.breakpoints.tablet - 1
          }px)`,
        );
        const mqlLaptop = window.matchMedia(
          `(min-width:${this.breakpoints.tablet}px) and (max-width:${
            this.breakpoints.laptop - 1
          }px)`,
        );
        const mqlDesktop = window.matchMedia(
          `(min-width:${this.breakpoints.desktop}px)`,
        );

        const onMQChange = () => setW();
        mqlMobile.addEventListener('change', onMQChange);
        mqlTablet.addEventListener('change', onMQChange);
        mqlLaptop.addEventListener('change', onMQChange);
        mqlDesktop.addEventListener('change', onMQChange);
      } catch {
        /* safari viejo: sin addEventListener; lo ignora */
      }

      if (window.visualViewport) {
        fromEvent(window.visualViewport, 'resize')
          .pipe(debounceTime(80))
          .subscribe(setW);
      }

      // 5) Al volver de BFCache o cambiar visibilidad
      fromEvent(window, 'pageshow').subscribe(setW);
      fromEvent(document, 'visibilitychange').subscribe(setW);
    }
  }

  public readonly isMobile = computed(
    () => this.screenWidth() < this.breakpoints.mobile,
  );
  public readonly isTablet = computed(
    () =>
      this.screenWidth() >= this.breakpoints.mobile &&
      this.screenWidth() < this.breakpoints.tablet,
  );
  public readonly isLaptop = computed(
    () =>
      this.screenWidth() >= this.breakpoints.tablet &&
      this.screenWidth() < this.breakpoints.laptop,
  );
  public readonly isDesktop = computed(
    () => this.screenWidth() >= this.breakpoints.desktop,
  );
  public readonly deviceType = computed(() => {
    if (!isPlatformBrowser(this.platformId)) return 'unknown';
    if (this.isMobile()) return 'mobile';
    if (this.isTablet()) return 'tablet';
    if (this.isLaptop()) return 'laptop';
    return 'desktop';
  });

  public updateBreakpoints(newBp: Partial<ViewportBreakpoints>): void {
    Object.assign(this.breakpoints, newBp);
    if (isPlatformBrowser(this.platformId)) {
      this.screenWidth.set(window.innerWidth);
    }
  }
}
