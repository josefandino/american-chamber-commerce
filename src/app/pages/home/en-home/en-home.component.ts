import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  inject,
} from '@angular/core';
import { AccordionItem } from '@shared/components/accordion/accordion.interface';
import { TextService } from '@shared/helpers';
import { AngularModule, MaterialModule } from '@shared/modules';

@Component({
  selector: 'app-en-home',
  imports: [AngularModule, MaterialModule],
  templateUrl: './en-home.component.html',
  styleUrl: '../home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EnHomeComponent {
  public flyer = './assets/en/svg/faculty-of-divinities.svg';
  public alt = 'Flyer American Chamber of Commerce';

  title: string = '';
  public isMenuOpen = false;
  public scrollPosition: number = 0;

  private readonly _text = inject(TextService);

  ngOnInit() {
    this.title = this._text.title;
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.scrollPosition = window.scrollY * 0.5;
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
