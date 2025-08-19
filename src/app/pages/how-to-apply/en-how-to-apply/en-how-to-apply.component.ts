import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AccordionItem } from '@shared/components/accordion/accordion.interface';
import { TextService } from '@shared/helpers';

@Component({
  selector: 'app-en-how-to-apply',
  imports: [],
  templateUrl: './en-how-to-apply.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EnHowToApplyComponent {
  flyer = './assets/webp/como_postularse.webp';
  alt = 'Flyer American Chamber of Commerce';

  title: string = '';

  private readonly _text = inject(TextService);

  ngOnInit() {
    this.title = this._text.title;
  }

  /* DROPDOWN 01 */
  public frequentlyAskedQuestionsData: AccordionItem[] = [
    {
      title: '¿Cómo postularme?',
      expanded: false,
      content: [
        {
          type: 'paragraph',
          text: `Para postularse, debes completar el formulario de postulación en el sitio web de la American Chamber Commerce.`,
        },
      ],
    },
  ];
}
