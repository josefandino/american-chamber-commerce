import { Component, HostListener, input } from '@angular/core';

import { AngularModule } from '../../modules';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss',
  imports: [AngularModule],
})
export class BannerComponent {
  banner = input.required<string>();
  alt = input.required<string>();

  scrollPosition: number = 0;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.scrollPosition = window.scrollY * 0.5;
  }
}
