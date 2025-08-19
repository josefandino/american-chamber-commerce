export interface AccordionItem {
  title: string;
  expanded: boolean;
  content: AccordionContent[];
}

export interface AccordionContent {
  type: 'paragraph' | 'list' | 'path';
  title?: string;
  text?: string;
  items?: string[];
  titleBody?: string;
  bodyNote?: string;
  linkText?: string;
  pathUrl?: string;
}
