import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';

import { RouterModule } from '@angular/router';
import { TextService } from '../shared/helpers';

@Component({
  selector: 'app-pages',
  standalone: true,
  templateUrl: './pages.component.html',
  styleUrl: './pages.component.scss',
  imports: [CommonModule, RouterModule],
})
export class PagesComponent {
  title: string = '';

  private readonly _text = inject(TextService);

  ngOnInit() {
    this.title = this._text.title;
  }
}
