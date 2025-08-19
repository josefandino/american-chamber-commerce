import { Component, HostListener, inject, OnInit } from '@angular/core';

import { AngularModule } from '@shared/modules';
import { NavComponent } from '@layout/nav/nav.component';
import { FooterComponent } from '@layout/footer/footer.component';
import { filter, Subscription } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { LanguageService } from '@shared/services/language.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [AngularModule, NavComponent, FooterComponent]
})
export class AppComponent implements OnInit {
  private localLanguage = localStorage.getItem('language');

  showGoBackTopButton = false;
  private routerSubscription: Subscription | undefined;

  private readonly _router = inject(Router);
  private readonly _languageSvc = inject(LanguageService);

  constructor() {
    const language = this.localLanguage || 'en';
    this._languageSvc.setLanguage(language);
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const windowHeight = window.innerHeight;
    const scrollPosition =
      window.scrollY || window.pageYOffset || document.body.scrollTop || 0;
    const scrollPercentage = (scrollPosition / windowHeight) * 100;

    this.showGoBackTopButton = scrollPosition >= 400;
  }

  ngOnInit(): void {
    this.routerSubscription = this._router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.goBackTop();
      });
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  public goBackTop(): void {
    window.scrollTo(0, 0);
  }
}
