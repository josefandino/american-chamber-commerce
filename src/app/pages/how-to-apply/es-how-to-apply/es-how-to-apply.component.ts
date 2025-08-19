import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BannerComponent } from '../../../shared/components/banner/banner.component';
import { TextService } from '@shared/helpers';
import { AccordionItem } from '@shared/components/accordion/accordion.interface';

@Component({
  selector: 'app-es-how-to-apply',
  imports: [],
  templateUrl: './es-how-to-apply.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EsHowToApplyComponent {
  flyer = './assets/webp/como_postularse.webp';
  alt = 'Flyer American Chamber of Commerce';

  title: string = '';

  private readonly _text = inject(TextService);

  ngOnInit() {
    this.title = this._text.title;
  }

  /* DESPLEGABLE 01 */
  public preguntasFrecuentesData: AccordionItem[] = [
    {
      title: '¿Qué es la American Chamber Commerce?',
      expanded: false,
      content: [
        {
          type: 'paragraph',
          text: `La American Chamber Commerce es la puente que conecta empresas con clientes y facilita soluciones legales y empresariales para un crecimiento seguro y global.`,
        },
      ],
    },
  ];
}
