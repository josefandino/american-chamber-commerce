import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  inject,
  ViewChild,
} from '@angular/core';
import { Subscription, interval } from 'rxjs';

import { AccordionItem } from '@shared/components/accordion/accordion.interface';
import { CHAMBER_INFO } from '@shared/const/info-acc';
import { TextService } from '@shared/helpers';
import { AngularModule, MaterialModule } from '@shared/modules';
import { AccordionComponent } from '@shared/components/accordion/accordion.component';

@Component({
  selector: 'app-en-home',
  imports: [AngularModule, MaterialModule, AccordionComponent],
  templateUrl: './en-home.component.html',
  styleUrl: '../home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EnHomeComponent implements AfterViewInit {
  public isMenuOpen = false;
  public scrollPosition: number = 0;

  title: string = '';

  @ViewChild('slider') slider!: ElementRef<HTMLDivElement>;
  currentIndex = 0;

  readonly chamberInfo = CHAMBER_INFO;

  intervalSub!: Subscription;

  private readonly _text = inject(TextService);

  ngOnInit() {
    this.title = this._text.title;
    this.intervalSub = interval(3000).subscribe(() => this.nextSlide());
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.scrollPosition = window.scrollY * 0.5;
  }

  ngAfterViewInit(): void {
    // escuchamos el fin de la transición
    this.slider.nativeElement.addEventListener('transitionend', () => {
      if (this.currentIndex === this.sliderList.length) {
        // si estamos en el slide duplicado (el 10), saltamos sin animación al original (0)
        this.slider.nativeElement.style.transition = 'none';
        this.currentIndex = 0;
        this.slider.nativeElement.style.transform = `translateX(0%)`;

        // forzamos reflujo para reactivar transición en el siguiente movimiento
        this.slider.nativeElement.offsetHeight;
        this.slider.nativeElement.style.transition =
          'transform 0.6s ease-in-out';
      }
    });
  }

  nextSlide() {
    this.currentIndex++;
    this.slider.nativeElement.style.transform = `translateX(-${this.currentIndex * 100}%)`;
  }

  ngOnDestroy(): void {
    this.intervalSub.unsubscribe();
  }

  public handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.toggleMenu();
    }
  }

  /* DESPLEGABLE 01 */
  public preguntasFrecuentesData: AccordionItem[] = [
    {
      title: 'What is the American Chamber Commerce?',
      expanded: false,
      content: [
        {
          type: 'paragraph',
          text: `The American Chamber Commerce is the bridge that connects businesses with clients and facilitates legal and business solutions for safe and global growth.`,
        },
      ],
    },
    {
      title: 'What services does it offer?',
      expanded: false,
      content: [
        {
          type: 'list',
          items: [
            'Legal and business advisory for company formation.',
            'Formal company registration and regulatory compliance.',
            'Connection between businesses, clients, and institutions.',
            'Training in trade, regulations, and best practices.',
            'Access to an international business network.',
          ],
        },
      ],
    },
    {
      title: 'Who can become members?',
      expanded: false,
      content: [
        {
          type: 'paragraph',
          text: `Membership is open to entrepreneurs, small and medium-sized enterprises, large corporations, and international investors interested in expanding their opportunities legally and securely.`,
        },
      ],
    },
    {
      title: 'How can I join?',
      expanded: false,
      content: [
        {
          type: 'paragraph',
          text: `Membership is completed online through our official portal. The process includes filling out a form, submitting legal documentation, and accepting our transparency and compliance terms.`,
        },
      ],
    },
    {
      title: 'What are the benefits of being a member?',
      expanded: false,
      content: [
        {
          type: 'list',
          items: [
            'Access to reliable legal and business services.',
            'Advisory on regulatory compliance.',
            'Participation in events, workshops, and international networking.',
            'Opportunity to connect with clients, suppliers, and investors.',
            'Visibility within the American Chamber Commerce business network.',
          ],
        },
      ],
    },
    {
      title: 'Does membership have a cost?',
      expanded: false,
      content: [
        {
          type: 'paragraph',
          text: `Yes, membership has an annual fee that varies depending on the type and size of the company. We offer flexible plans tailored for entrepreneurs, SMEs, and large corporations.`,
        },
      ],
    },
    {
      title: 'How does the American Chamber Commerce ensure transparency?',
      expanded: false,
      content: [
        {
          type: 'paragraph',
          text: `We operate under values of integrity, strict compliance, and responsibility. All registration processes and services follow verification protocols to ensure legality and transparency of operations.`,
        },
      ],
    },
    {
      title: 'Does the Chamber have international reach?',
      expanded: false,
      content: [
        {
          type: 'paragraph',
          text: `Yes, our reach is global. We connect businesses from different countries with clients, institutions, and international markets, removing borders to business growth.`,
        },
      ],
    },
    {
      title: 'How does the Chamber protect members’ information?',
      expanded: false,
      content: [
        {
          type: 'paragraph',
          text: `All information is handled under strict privacy and security policies. We follow data protection protocols, encryption, and compliance with international regulations such as GDPR and CCPA.`,
        },
      ],
    },
    {
      title: 'How can I contact the American Chamber Commerce?',
      expanded: false,
      content: [
        {
          type: 'paragraph',
          text: `You can contact us through our official portal, by email at info@americanchamberofcommerce.us, or via WhatsApp at +1-347-545-9684. We are also present on Facebook, LinkedIn, and Instagram.`,
        },
      ],
    },
  ];

  public sliderList = [
    {
      id: 1,
      img: './assets/webp/slider/slider-01.webp',
      alt: this.chamberInfo.title,
    },
    {
      id: 2,
      img: './assets/webp/slider/slider-02.webp',
      alt: this.chamberInfo.title,
    },
    {
      id: 3,
      img: './assets/webp/slider/slider-03.webp',
      alt: this.chamberInfo.title,
    },
    {
      id: 4,
      img: './assets/webp/slider/slider-04.webp',
      alt: this.chamberInfo.title,
    },
    {
      id: 5,
      img: './assets/webp/slider/slider-05.webp',
      alt: this.chamberInfo.title,
    },
    {
      id: 6,
      img: './assets/webp/slider/slider-06.webp',
      alt: this.chamberInfo.title,
    },
    {
      id: 7,
      img: './assets/webp/slider/slider-07.webp',
      alt: this.chamberInfo.title,
    },
    {
      id: 8,
      img: './assets/webp/slider/slider-08.webp',
      alt: this.chamberInfo.title,
    },
    {
      id: 9,
      img: './assets/webp/slider/slider-09.webp',
      alt: this.chamberInfo.title,
    },
  ];
}
