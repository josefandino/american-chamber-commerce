import { Component, inject, OnInit } from '@angular/core';
import { TextService } from '@shared/helpers';

@Component({
  selector: 'app-es-about',
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: '../about.component.scss',
})
export default class EsAboutComponent implements OnInit {
  title: string = '';
  public banner = './assets/webp/sobre_nosotros.webp';

  private readonly _text = inject(TextService);

  ngOnInit() {
    this.title = this._text.title;
  }
}
