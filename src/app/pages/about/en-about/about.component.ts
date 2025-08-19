import { Component, inject, OnInit } from '@angular/core';
import { BannerComponent } from '@shared/components/banner/banner.component';
import { TextService } from '@shared/helpers';

@Component({
    selector: 'app-en-about',
    imports: [BannerComponent],
    templateUrl: './about.component.html',
    styleUrl: './about.component.scss'
})
export default class EnAboutComponent implements OnInit {
  title: string = '';
  public banner = './assets/en/svg/about.svg';

  private readonly _text = inject(TextService);

  ngOnInit() {
    this.title = this._text.title;
  }
}
