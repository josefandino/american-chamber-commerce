import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  inject,
} from '@angular/core';
import { AccordionComponent } from '@shared/components/accordion/accordion.component';
import { AccordionItem } from '@shared/components/accordion/accordion.interface';
import { CHAMBER_INFO } from '@shared/const/info-acc';
import { TextService } from '@shared/helpers';
import { AngularModule, MaterialModule } from '@shared/modules';

@Component({
  selector: 'app-es-home',
  imports: [AngularModule, MaterialModule, AccordionComponent],
  templateUrl: './es-home.component.html',
  styleUrl: '../home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EsHomeComponent {
  public flyer = './assets/webp/facultad_divinidades.webp';
  public alt = 'Flyer American Chamber of Commerce';

  public isMenuOpen = false;
  public scrollPosition: number = 0;

  title: string = '';

  readonly chamberInfo = CHAMBER_INFO;
  private readonly _text = inject(TextService);

  ngOnInit() {
    this.title = this._text.title;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.scrollPosition = window.scrollY * 0.5;
  }

  public handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.toggleMenu();
    }
  }

  /* DESPLEGABLE 01 */
  public preguntasFrecuentesData: AccordionItem[] = [
    {
      title: '¿Qué es la American Chamber Commerce?',
      expanded: false,
      content: [
        {
          type: 'paragraph',
          text: `La American Chamber Commerce es el puente que conecta empresas con clientes y facilita soluciones legales y empresariales para un crecimiento seguro y global.`,
        },
      ],
    },
    {
      title: '¿Qué servicios ofrece?',
      expanded: false,
      content: [
        {
          type: 'list',
          items: [
            'Asesoría legal y empresarial para la constitución de empresas.',
            'Registro formal de compañías y cumplimiento normativo.',
            'Conexión entre empresas, clientes e instituciones.',
            'Capacitación en comercio, normativas y mejores prácticas.',
            'Acceso a una red empresarial internacional.',
          ],
        },
      ],
    },
    {
      title: '¿Quiénes pueden ser miembros?',
      expanded: false,
      content: [
        {
          type: 'paragraph',
          text: `Pueden ser miembros emprendedores, pequeñas y medianas empresas, grandes corporaciones e inversionistas internacionales interesados en expandir sus oportunidades de manera legal y segura.`,
        },
      ],
    },
    {
      title: '¿Cómo puedo afiliarme?',
      expanded: false,
      content: [
        {
          type: 'paragraph',
          text: `La afiliación se realiza en línea a través de nuestro portal oficial. El proceso incluye el llenado de un formulario, la entrega de documentación legal y la aceptación de nuestros términos de transparencia y cumplimiento.`,
        },
      ],
    },
    {
      title: '¿Qué beneficios tiene ser miembro?',
      expanded: false,
      content: [
        {
          type: 'list',
          items: [
            'Acceso a servicios legales y empresariales confiables.',
            'Asesoramiento en cumplimiento normativo.',
            'Participación en eventos, talleres y networking internacional.',
            'Oportunidad de conectar con clientes, proveedores e inversionistas.',
            'Visibilidad en la red empresarial de la American Chamber Commerce.',
          ],
        },
      ],
    },
    {
      title: '¿La membresía tiene costo?',
      expanded: false,
      content: [
        {
          type: 'paragraph',
          text: `Sí, la membresía tiene un costo anual que varía según el tipo y tamaño de la empresa. Ofrecemos planes flexibles adaptados a emprendedores, pymes y grandes corporaciones.`,
        },
      ],
    },
    {
      title: '¿Cómo garantiza la American Chamber Commerce la transparencia?',
      expanded: false,
      content: [
        {
          type: 'paragraph',
          text: `Operamos bajo valores de integridad, cumplimiento estricto y responsabilidad. Todos los procesos de registro y servicios cuentan con protocolos de verificación para garantizar la legalidad y transparencia de las operaciones.`,
        },
      ],
    },
    {
      title: '¿La Cámara tiene alcance internacional?',
      expanded: false,
      content: [
        {
          type: 'paragraph',
          text: `Sí, nuestro alcance es global. Conectamos empresas de diferentes países con clientes, instituciones y mercados internacionales, eliminando fronteras en el crecimiento empresarial.`,
        },
      ],
    },
    {
      title: '¿Cómo protege la Cámara la información de los miembros?',
      expanded: false,
      content: [
        {
          type: 'paragraph',
          text: `Toda la información se maneja bajo estrictas políticas de privacidad y seguridad. Contamos con protocolos de protección de datos, cifrado y cumplimiento de normativas internacionales como GDPR y CCPA.`,
        },
      ],
    },
    {
      title: '¿Cómo puedo contactar a la American Chamber Commerce?',
      expanded: false,
      content: [
        {
          type: 'paragraph',
          text: `Puede contactarnos a través de nuestro portal oficial, correo electrónico info@americanchamberofcommerce.us o mediante WhatsApp al +1-347-545-9684. También estamos presentes en Facebook, LinkedIn e Instagram.`,
        },
      ],
    },
  ];
}
