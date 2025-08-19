import { Component, Input } from '@angular/core';

import { AngularModule, MaterialModule } from '@shared/modules';
import { AccordionItem } from './accordion.interface';

@Component({
    selector: 'app-accordion',
    imports: [AngularModule, MaterialModule],
    templateUrl: './accordion.component.html',
    styleUrl: './accordion.component.scss'
})
export class AccordionComponent {
  @Input() accordionsData: AccordionItem[] = [
    { title: '', expanded: false, content: [] },
  ];

  expandedAccordionIndex: number | null = null;

  toggleAccordion(accordion: AccordionItem, index: number): void {
    if (this.expandedAccordionIndex === index) {
      // Si el acordeón ya está abierto, ciérralo
      this.expandedAccordionIndex = null;
      accordion.expanded = false;
    } else {
      // Si hay otro acordeón abierto, ciérralo
      if (this.expandedAccordionIndex !== null) {
        this.accordionsData[this.expandedAccordionIndex].expanded = false;
      }
      // Abre el nuevo acordeón y actualiza el índice
      this.expandedAccordionIndex = index;
      accordion.expanded = true;
    }
  }

  public onKeydown(
    event: KeyboardEvent,
    accordion: AccordionItem,
    index: number,
  ): void {
    if (event.key === 'Enter' || event.key === ' ') {
      this.toggleAccordion(accordion, index);
    }
  }
}
